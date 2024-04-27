import { EditorFooter } from "./_components";

interface Props {
  params: {
    formId: string;
  };
}

const FormPage = ({ params }: Props) => {
  const { formId } = params;

  return (
    <div className="border mt-5 p-2">
      <h2>Nombre</h2>
      <div></div>
      <EditorFooter />
    </div>
  );
};

export default FormPage;
