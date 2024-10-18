use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("9FkQWWAuSepjpHQoJKTKVV2ryYCvWd74tCdhTuUaGvBf");

#[program]
pub mod velux_link_dw {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let admin: &mut Account<'_, AdminAccount> = &mut ctx.accounts.admin_account;
        let treasury_account: &mut Account<VeluxTreasury> = &mut ctx.accounts.veluxlink_treasury;

        admin.admin = ctx.accounts.user.key();
        treasury_account.balance = 0;

        Ok(())
    }

    pub fn initialize_user_balance_account(
        ctx: Context<InitializeUserBalanceAccount>,
    ) -> Result<()> {
        let user_bal_acc: &mut Account<UserBalance> = &mut ctx.accounts.user_balance;

        user_bal_acc.balance = 0;
        user_bal_acc.version = 1;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<u64> {
        let user_balance: &mut Account<'_, UserBalance> = &mut ctx.accounts.user_balance;
        let velux_treasury: &mut Account<VeluxTreasury> = &mut ctx.accounts.velux_treasury;
        let user: &Signer = &ctx.accounts.user;

        // Perform the transfer
        anchor_lang::system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: user.to_account_info(),
                    to: velux_treasury.to_account_info(),
                },
            ),
            amount,
        )?;

        // Update balances
        velux_treasury.balance = velux_treasury
            .balance
            .checked_add(amount)
            .ok_or(ProgramError::ArithmeticOverflow)?;

        user_balance.balance = user_balance
            .balance
            .checked_add(amount)
            .ok_or(ProgramError::ArithmeticOverflow)?;

        Ok(user_balance.balance)
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let caller: &Signer = &ctx.accounts.caller;
        let admin: &Account<AdminAccount> = &ctx.accounts.admin_account;

        let velux_treasury: &mut Account<VeluxTreasury> = &mut ctx.accounts.velux_treasury;

        if caller.key() != admin.admin {
            return Err(ProgramError::NotTheAdmin.into());
        }

        if velux_treasury.balance < amount {
            return Err(ProgramError::InsufficientFunds.into());
        }

        **velux_treasury.to_account_info().try_borrow_mut_lamports()? -= amount;
        **caller.to_account_info().try_borrow_mut_lamports()? += amount;

        velux_treasury.balance -= amount;

        Ok(())
    }

    pub fn get_user_balance(ctx: Context<GetUserBalance>) -> Result<u64> {
        Ok(ctx.accounts.user_balance.balance)
    }

    pub fn modify_user_balance(
        ctx: Context<ModifyUserBalance>,
        amount_difference: u64,
    ) -> Result<()> {
        let user_balance: &mut Account<'_, UserBalance> = &mut ctx.accounts.user_balance;
        let admin: &Pubkey = &ctx.accounts.admin.admin;

        let caller: &Pubkey = &ctx.accounts.user.key();

        if caller != admin {
            return Err(ProgramError::NotTheAdmin.into());
        }

        user_balance.balance = user_balance
            .balance
            .checked_sub(amount_difference)
            .ok_or(ProgramError::ArithmeticOverflow)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,
        payer = user,
        space = 8 + 32, seeds = [b"admin-account"],
        bump)]
    pub admin_account: Account<'info, AdminAccount>,
    #[account(init,
        payer = user,
        space = 8 + 8, seeds = [b"treasury"],
        bump)]
    pub veluxlink_treasury: Account<'info, VeluxTreasury>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut, seeds = [b"user-balance", user.key().as_ref()],
        bump)]
    pub user_balance: Account<'info, UserBalance>,

    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"treasury"],
        bump)]
    pub velux_treasury: Account<'info, VeluxTreasury>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub caller: Signer<'info>,
    #[account(mut, seeds = [b"admin-account"],
        bump)]
    pub admin_account: Account<'info, AdminAccount>,
    #[account(mut, seeds = [b"treasury"],
        bump)]
    pub velux_treasury: Account<'info, VeluxTreasury>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitializeUserBalanceAccount<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 64 + 8,
        seeds = [b"user-balance", user.key().as_ref()],
        bump
    )]
    pub user_balance: Account<'info, UserBalance>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ModifyUserBalance<'info> {
    pub user: Signer<'info>,
    #[account(mut)]
    pub user_balance: Account<'info, UserBalance>,
    #[account(mut, seeds = [b"admin-account"],
        bump)]
    pub admin: Account<'info, AdminAccount>,
}

#[derive(Accounts)]
pub struct GetUserBalance<'info> {
    #[account(
        seeds = [b"user-balance", target_user.key().as_ref()],
        bump
    )]
    pub user_balance: Account<'info, UserBalance>,
    /// CHECK: This account is not written to or read from
    pub target_user: UncheckedAccount<'info>,
}

#[account]
pub struct VeluxTreasury {
    pub balance: u64,
}

#[account]
pub struct UserBalance {
    pub balance: u64,
    pub version: u8,
}

#[account]
pub struct AdminAccount {
    pub admin: Pubkey,
}

#[error_code]
pub enum ProgramError {
    #[msg("Insufficient funds for withdrawal")]
    InsufficientFunds,
    #[msg("Arithmetic overflow")]
    ArithmeticOverflow,
    #[msg("Not the admin")]
    NotTheAdmin,
}
