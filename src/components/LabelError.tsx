import { ErrorMessage } from "formik";

const LabelError = ({ name }: { name: string }) => {
  return (
    <p className="text-xs text-red-400">
      <ErrorMessage name={name} />
    </p>
  );
};

export default LabelError;
