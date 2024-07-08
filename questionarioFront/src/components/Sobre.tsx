import { useAtom } from "jotai";
import { darkThemeAtom } from "../lib/atom";

const Sobre = () => {
  const [darkTheme] = useAtom(darkThemeAtom);

  return (
    <div className={` min-h-screen flex items-center justify-center ${darkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Sobre</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Bem-vindo ao nosso site de criação de questionários! Aqui você pode criar questionários para descobrir o que as pessoas sabem sobre diferentes assuntos de forma fácil e rápida.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Nosso objetivo é proporcionar uma plataforma intuitiva e eficiente para você coletar informações e opiniões valiosas dos seus usuários.
        </p>
      </div>
    </div>
  );
}

export default Sobre;
