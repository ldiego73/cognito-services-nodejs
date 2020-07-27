import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonToast,
} from "@ionic/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

interface FormErrors {
  message: string;
}

enum Status {
  CREATE_USER = 1,
  CONFIRM_USER = 2,
}

const Register: React.FC = () => {
  const [username, setUsername] = useState<string | null | undefined>();
  const [password, setPassword] = useState<string | null | undefined>();
  const [email, setEmail] = useState<string | null | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string | null | undefined>();
  const [code, setCode] = useState<string | null | undefined>();

  const [status, setStatus] = useState<Status>(Status.CREATE_USER);
  const [formErrors, setFormErrors] = useState<FormErrors>({ message: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const history = useHistory();

  const submit = async () => {
    try {
      switch (status) {
        case Status.CREATE_USER:
          await createUser();
          setStatus(Status.CONFIRM_USER);
          setShowInfo(true);
          return;
        case Status.CONFIRM_USER:
          await confirmUser();
          break;
        default:
          break;
      }
      const data = await login();

      localStorage.setItem("session", JSON.stringify({ ...data, username }));
      history.push("/home");
    } catch (err) {
      setFormErrors(err?.response?.data ? err.response.data : err);
      setShowAlert(true);
    }
  };

  const createUser = async () => {
    await axios.post("http://127.0.0.1:3000/oauth/signup", {
      username,
      password,
      email,
      phoneNumber,
    });
  };

  const confirmUser = async () => {
    await axios.post("http://127.0.0.1:3000/oauth/confirm_registration", {
      username,
      code,
    });
  };

  const login = async () => {
    const { data } = await axios.post(
      "http://127.0.0.1:3000/oauth/authenticate",
      {
        username,
        password,
      }
    );

    return data;
  }

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrarse</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <IonToast
            color="danger"
            position="top"
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            message={formErrors.message}
            duration={1500}
          />
          <IonToast
            position="top"
            isOpen={showInfo}
            onDidDismiss={() => setShowInfo(false)}
            message="Se ha creado el usuario con éxito, por favor ingresar el código enviado"
            duration={3000}
          />
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Username</IonLabel>
              <IonInput
                type="text"
                name="username"
                autocomplete="off"
                placeholder="Username"
                required={true}
                onIonChange={(e) => setUsername(e.detail.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                type="password"
                name="password"
                autocomplete="off"
                placeholder="Password"
                required={true}
                onIonChange={(e) => setPassword(e.detail.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                name="email"
                autocomplete="off"
                placeholder="Email"
                required={true}
                onIonChange={(e) => setEmail(e.detail.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Celular</IonLabel>
              <IonInput
                type="text"
                name="celular"
                autocomplete="off"
                placeholder="Celular"
                required={true}
                onIonChange={(e) => setPhoneNumber(e.detail.value)}
              />
            </IonItem>
            {status === Status.CONFIRM_USER && (
              <>
                <IonItem>
                  <IonLabel position="stacked">Code</IonLabel>
                  <IonInput
                    type="text"
                    name="code"
                    autocomplete="off"
                    placeholder="Code"
                    onIonChange={(e) => setCode(e.detail.value)}
                  />
                </IonItem>
              </>
            )}
            <div>
              <IonButton
                type="submit"
                color="dark"
                expand="block"
                size="default"
              >
                {status === Status.CREATE_USER
                  ? "Crear Usuario"
                  : "Confirmar Usuario"}
              </IonButton>
            </div>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export { Register };
