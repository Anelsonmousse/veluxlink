// No imports needed: web3, anchor, pg and more are globally available

// Tests written on beta.solpg.io

describe("Test", () => {
    // it("initialize", async () => {
    //   const [adminAccountPDA, _] = await web3.PublicKey.findProgramAddress(
    //     [Buffer.from("admin-account")],
    //     pg.program.programId
    //   );
    //   const [treasuryPDA, __] = await web3.PublicKey.findProgramAddress(
    //     [Buffer.from("treasury")],
    //     pg.program.programId
    //   );
    //   const arrKey = Uint8Array.from([
    //     44, 146, 74, 69, 21, 100, 33, 162, 109, 227, 250, 219, 108, 136, 1, 167,
    //     159, 20, 86, 80, 62, 166, 136, 172, 158, 53, 87, 205, 234, 202, 131, 226,
    //     103, 38, 99, 217, 11, 217, 4, 15, 255, 244, 128, 105, 88, 62, 247, 131,
    //     209, 126, 78, 112, 219, 169, 128, 154, 128, 67, 169, 200, 34, 79, 219,
    //     252,
    //   ]);
    //   console.log(adminAccountPDA.toBase58());
    //   console.log(treasuryPDA.toBase58());
    //   const acc = web3.Keypair.fromSecretKey(arrKey);
    //   // Send transaction
    //   const txHash = await pg.program.methods
    //     .initialize()
    //     .accounts({
    //       adminAccount: adminAccountPDA,
    //       veluxlinkTreasury: treasuryPDA,
    //       user: acc.publicKey,
    //       systemProgram: web3.SystemProgram.programId,
    //     })
    //     .signers([acc])
    //     .rpc();
    //   console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
    //   // Confirm transaction
    //   await pg.connection.confirmTransaction(txHash);
    //   // Fetch the created account
    //   const onchain_admin_account = await pg.program.account.adminAccount.fetch(
    //     adminAccountPDA
    //   );
    //   const onchain_treasury_account =
    //     await pg.program.account.veluxTreasury.fetch(treasuryPDA);
    //   console.log("On-chain admin is:", onchain_admin_account.admin.toBase58());
    //   console.log(
    //     "On-chain treasury balance is:",
    //     onchain_treasury_account.balance.toString()
    //   );
    //   assert.equal(
    //     acc.publicKey.toBase58(),
    //     onchain_admin_account.admin.toBase58()
    //   );
    // });
  
    // it("deposits", async () => {
    //   const connection = pg.connection;
  
    //   const [treasuryPDA, __] = await web3.PublicKey.findProgramAddress(
    //     [Buffer.from("treasury")],
    //     pg.program.programId
    //   );
  
    //   const treasury_balance = await connection.getBalance(treasuryPDA);
    //   console.log("tr bal: ", treasury_balance);
  
    //   const arrKey = Uint8Array.from([
    //     214, 149, 167, 114, 98, 187, 99, 237, 147, 37, 145, 209, 47, 221, 223,
    //     252, 18, 144, 207, 238, 148, 126, 225, 55, 191, 252, 202, 60, 105, 217,
    //     117, 167, 219, 109, 123, 75, 170, 142, 97, 77, 10, 84, 194, 148, 209, 142,
    //     16, 129, 223, 90, 200, 31, 98, 165, 39, 57, 24, 232, 136, 109, 146, 58,
    //     39, 145,
    //   ]);
    //   const user = web3.Keypair.fromSecretKey(arrKey);
    //   // Derive PDA for user_balance
    //   const [userBalancePDA, _] = await web3.PublicKey.findProgramAddressSync(
    //     [Buffer.from("user-balance"), user.publicKey.toBuffer()],
    //     pg.program.programId
    //   );
    //   try {
    //     const old_user_balance = await pg.program.account.userBalance.fetch(
    //       userBalancePDA
    //     );
    //     const old_treasury_balance = await connection.getBalance(treasuryPDA);
  
    //     const amount = new BN(web3.LAMPORTS_PER_SOL * 1);
    //     await pg.program.methods
    //       .deposit(amount)
    //       .accounts({
    //         userBalance: userBalancePDA,
    //         user: user.publicKey,
    //         systemProgram: web3.SystemProgram.programId,
    //         veluxTreasury: treasuryPDA,
    //       })
    //       .signers([user])
    //       .rpc();
  
    //     const new_user_balance = await pg.program.account.userBalance.fetch(
    //       userBalancePDA
    //     );
    //     // ...............
  
    //     const onchain_treasury_account =
    //       await pg.program.account.veluxTreasury.fetch(treasuryPDA);
  
    //     const new_treasury_balance = await connection.getBalance(treasuryPDA);
  
    //     console.log(
    //       "On-chain treasury balance is:",
    //       onchain_treasury_account.balance.toString()
    //     );
    //     assert.equal(
    //       String(old_user_balance.balance.toNumber() + amount.toNumber()),
    //       new_user_balance.balance.toString()
    //     );
  
    //     assert.equal(
    //       old_treasury_balance + amount.toNumber(),
    //       new_treasury_balance
    //     );
    //   } catch (e) {
    //     console.log(e);
    //     await pg.program.methods
    //       .initializeUserBalanceAccount()
    //       .accounts({
    //         userBalance: userBalancePDA,
    //         user: user.publicKey,
    //         systemProgram: web3.SystemProgram.programId,
    //       })
    //       .signers([user])
    //       .rpc();
  
    //     console.log("User Balance Account Initialized");
    //   }
    // });
  
    // it("modifies users balance", async () => {
    //   try {
    //     const adminArrKey = Uint8Array.from([
    //       44, 146, 74, 69, 21, 100, 33, 162, 109, 227, 250, 219, 108, 136, 1, 167,
    //       159, 20, 86, 80, 62, 166, 136, 172, 158, 53, 87, 205, 234, 202, 131,
    //       226, 103, 38, 99, 217, 11, 217, 4, 15, 255, 244, 128, 105, 88, 62, 247,
    //       131, 209, 126, 78, 112, 219, 169, 128, 154, 128, 67, 169, 200, 34, 79,
    //       219, 252,
    //     ]);
    //     const userArrKey = Uint8Array.from([
    //       214, 149, 167, 114, 98, 187, 99, 237, 147, 37, 145, 209, 47, 221, 223,
    //       252, 18, 144, 207, 238, 148, 126, 225, 55, 191, 252, 202, 60, 105, 217,
    //       117, 167, 219, 109, 123, 75, 170, 142, 97, 77, 10, 84, 194, 148, 209,
    //       142, 16, 129, 223, 90, 200, 31, 98, 165, 39, 57, 24, 232, 136, 109, 146,
    //       58, 39, 145,
    //     ]);
    //     const [adminAccountPDACheck, _] =
    //       await web3.PublicKey.findProgramAddressSync(
    //         [Buffer.from("admin-account")],
    //         pg.program.programId
    //       );
    //     const admin = web3.Keypair.fromSecretKey(adminArrKey);
    //     const user = web3.Keypair.fromSecretKey(userArrKey);
  
    //     // Derive user user balance account
    //     const [userBalancePDA, __] = await web3.PublicKey.findProgramAddressSync(
    //       [Buffer.from("user-balance"), user.publicKey.toBuffer()],
    //       pg.program.programId
    //     );
    //     const old_user_balance = await pg.program.account.userBalance.fetch(
    //       userBalancePDA
    //     );
    //     const amountDifference = new BN(web3.LAMPORTS_PER_SOL * 1);
  
    //     await pg.program.methods
    //       .modifyUserBalance(amountDifference)
    //       .accounts({
    //         user: admin.publicKey,
    //         admin: adminAccountPDACheck,
    //         userBalance: userBalancePDA,
    //       })
    //       .signers([admin])
    //       // .signers([user]) // throw error
    //       .rpc();
  
    //     // assert.fail("Only admin can modify users balance");
  
    //     const new_user_balance = await pg.program.account.userBalance.fetch(
    //       userBalancePDA
    //     );
  
    //     assert.equal(
    //       old_user_balance.balance.sub(amountDifference).toNumber(),
    //       new_user_balance.balance.toNumber()
    //     );
    //   } catch (e) {
    //     // assert.equal(e.message, "Not the admin");
    //   }
    // });
  
    it("withdraws from treasury", async () => {
      try {
        const connection = pg.connection;
  
        const adminArrKey = Uint8Array.from([
          44, 146, 74, 69, 21, 100, 33, 162, 109, 227, 250, 219, 108, 136, 1, 167,
          159, 20, 86, 80, 62, 166, 136, 172, 158, 53, 87, 205, 234, 202, 131,
          226, 103, 38, 99, 217, 11, 217, 4, 15, 255, 244, 128, 105, 88, 62, 247,
          131, 209, 126, 78, 112, 219, 169, 128, 154, 128, 67, 169, 200, 34, 79,
          219, 252,
        ]);
  
        const [treasuryPDA, _] = await web3.PublicKey.findProgramAddress(
          [Buffer.from("treasury")],
          pg.program.programId
        );
  
        const [adminPDA, __] = await web3.PublicKey.findProgramAddress(
          [Buffer.from("admin-account")],
          pg.program.programId
        );
  
        const adminAcc = web3.Keypair.fromSecretKey(adminArrKey);
        const old_treasury_balance = new BN(
          await connection.getBalance(treasuryPDA)
        );
  
        const amount_to_withdraw = new BN(old_treasury_balance.toNumber() / 2);
  
        console.log("Old treasury balance: ", old_treasury_balance.toNumber());
  
        await pg.program.methods
          .withdraw(amount_to_withdraw)
          .accounts({
            systemProgram: web3.SystemProgram.programId,
            caller: adminAcc.publicKey,
            adminAccount: adminPDA,
            veluxTreasury: treasuryPDA,
          })
          .signers([adminAcc])
          .rpc();
  
        const new_treasury_balance = new BN(
          await connection.getBalance(treasuryPDA)
        );
        console.log("New treasury balance: ", new_treasury_balance.toNumber());
  
        assert.equal(
          new_treasury_balance.toNumber(),
          old_treasury_balance.sub(amount_to_withdraw)
        );
      } catch (e) {
        console.log(e);
      }
    });
  });
  