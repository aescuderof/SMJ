import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../../config/axiosClient";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.mensaje) {
      setFeedback({
        type: "error",
        message: "Completa todos los campos antes de enviar.",
      });
      return;
    }

    setIsSending(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await axiosClient.post("/contact", formData);
      setFeedback({
        type: "success",
        message: response?.data?.message || "Mensaje enviado correctamente.",
      });
      setFormData({ nombre: "", correo: "", mensaje: "" });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error?.response?.data?.message ||
          "No se pudo enviar el mensaje. Intenta nuevamente.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="relative isolate bg-dust-grey-50 px-6 pb-5 pt-2 sm:pb-5 sm:pt-3 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36rem] max-w-none -translate-x-1/2 rotate-6 bg-linear-to-tr from-dust-grey-200 to-dust-grey-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-dust-grey-700 sm:text-5xl">Contacto</h1>
        <p className="mt-3 text-lg text-dust-grey-800">
          ¿Tienes dudas sobre tallas, materiales o pedidos personalizados? Estamos para ayudarte.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-dust-grey-100 px-5 py-4 text-center ring-1 ring-dust-grey-200">
          <p className="text-sm font-semibold text-dust-grey-900">Email</p>
          <a href="mailto:contacto@senoritamariajoyas.com" className="mt-1 block text-sm text-dust-grey-700 hover:underline">
            contacto@senoritamariajoyas.com
          </a>
        </div>
        <div className="rounded-xl border border-dust-grey-100 px-5 py-4 text-center ring-1 ring-dust-grey-200">
          <p className="text-sm font-semibold text-dust-grey-900">WhatsApp</p>
          <a href="https://wa.me/56958136116" className="mt-1 block text-sm text-dust-grey-700 hover:underline">
            +56 9 58136116
          </a>
        </div>
        
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-5 max-w-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="nombre" className="block text-sm font-semibold text-dust-grey-900">
              Nombre
            </label>
            <div className="mt-2.5">
              <input
                id="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-dust-grey-900 outline-1 -outline-offset-1 outline-dust-grey-300 placeholder:text-dust-grey-400 focus:outline-2 focus:-outline-offset-2 focus:outline-dust-grey-500"
                placeholder="Tu nombre"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="correo" className="block text-sm font-semibold text-dust-grey-900">
              Correo electrónico
            </label>
            <div className="mt-2.5">
              <input
                id="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-dust-grey-900 outline-1 -outline-offset-1 outline-dust-grey-300 placeholder:text-dust-grey-400 focus:outline-2 focus:-outline-offset-2 focus:outline-dust-grey-500"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="mensaje" className="block text-sm font-semibold text-dust-grey-900">
              Mensaje
            </label>
            <div className="mt-2.5">
              <textarea
                id="mensaje"
                rows="4"
                value={formData.mensaje}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-dust-grey-900 outline-1 -outline-offset-1 outline-dust-grey-300 placeholder:text-dust-grey-400 focus:outline-2 focus:-outline-offset-2 focus:outline-dust-grey-500"
                placeholder="Cuéntanos cómo podemos ayudarte"
              />
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm text-dust-grey-600">
          Al enviar este formulario aceptas nuestra política de privacidad y el uso de tus datos para responder tu consulta.
        </p>

        {feedback.message ? (
          <p className={`mt-3 text-sm ${feedback.type === "success" ? "text-green-700" : "text-red-600"}`}>
            {feedback.message}
          </p>
        ) : null}

        <div className="mt-8">
          <button
            type="submit"
            className="block w-full rounded-md bg-dust-grey-700 px-3.5 py-2.5 text-center text-sm font-semibold text-dust-grey-50 transition hover:bg-dust-grey-800 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSending}
          >
            {isSending ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link to="/products" className="text-sm font-medium text-dust-grey-700 hover:text-dust-grey-900">
            Volver a la tienda →
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Contact;
