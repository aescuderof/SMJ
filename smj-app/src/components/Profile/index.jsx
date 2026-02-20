import { useState, useContext, useEffect } from "react";

import UserContext from "../../context/User/UserContext";

export default function Profile() {
  const [loading, setLoading] = useState(true);

  const userCtx = useContext(UserContext);

  const { updateUser } = userCtx;

  const { currentUser } = userCtx;
  const username = currentUser && currentUser.username ? currentUser.username : "";
  const email = currentUser && currentUser.email ? currentUser.email : "";
  const country = currentUser && currentUser.country ? currentUser.country : "";
  const address = currentUser && currentUser.address ? currentUser.address : "";
  const zipcode = currentUser && currentUser.zipcode ? currentUser.zipcode : "";

  const [userForm, setUserForm] = useState({
    username: "",
    country: "",
    address: "",
    zipcode: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      if (!userCtx.authStatus) {
        await userCtx.verifyUser();
      }
      setUserForm({
        ...userForm,
        username,
        country,
        address,
        zipcode,
      });
      setLoading(false);
    };
    checkUser();
    // eslint-disable-next-line
  }, []);

  const handleChange = async (event) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async (event) => {
    event.preventDefault();

    await updateUser(userForm);
  };

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto pt-8 pb-24 px-6 flex flex-col items-center justify-center">
        <div className="loader mb-4" style={{width: '48px', height: '48px', border: '6px solid #ccc', borderTop: '6px solid #333', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
        <p className="text-center text-dust-grey-500">Cargando perfil...</p>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }
  if (!userCtx.authStatus) {
    return (
      <main className="max-w-5xl mx-auto pt-8 pb-24 px-6">
        <p className="text-center text-red-500">No estás autenticado. Inicia sesión para ver tu perfil.</p>
      </main>
    );
  }
  return (
    <>
      <div className="mx-auto py-4 px-8">
        <div className="space-y-16 ">
          <section>
            <form
              onSubmit={(e) => {
                sendData(e);
              }}
            >
              <div className="">
                <div className="px-4">
                  <div>
                    <h2 className="text-3xl font-bold mt-8">Tu perfil</h2>
                    <p className="mt-2 mb-8 text-sm">
                      Recuerda que estás en un proyecto académico. No coloques
                      información real. 😉
                    </p>
                  </div>
                  <div className="mt-6 grid grid-cols-4 gap-6">
                    <div className="col-span-4 sm:col-span-2">
                      <label className="form-label">Tu nombre de usuario</label>
                      <input
                        type="text"
                        name="username"
                        value={userForm.username}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-input"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label className="form-label">Tu email</label>
                      <input
                        disabled
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-input"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label className="form-label">Tu país</label>
                      <input
                        type="text"
                        name="country"
                        value={userForm.country}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-input"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-1">
                      <label className="form-label">
                        <span>Código postal</span>
                      </label>
                      <input
                        type="number"
                        name="zipcode"
                        value={userForm.zipcode}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-input"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-3">
                      <label className="form-label">Dirección</label>
                      <input
                        type="text"
                        name="address"
                        value={userForm.address}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 px-4 py-3">
                  <button type="submit" className="form-button w-auto">
                    Guardar cambios
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
