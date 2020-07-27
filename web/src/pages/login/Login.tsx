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

interface FormValue {
  value: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string | null | undefined>();
  const [password, setPassword] = useState<string | null | undefined>();
  const [formErrors, setFormErrors] = useState<FormErrors>({ message: "" });
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();

  const submit = async () => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:3000/oauth/authenticate",
        {
          username,
          password,
        }
      );
      localStorage.setItem("session", JSON.stringify({ ...data, username }));
      history.push("/home");
    } catch (err) {
      setFormErrors(err?.response?.data ? err.response.data : err);
      setShowAlert(true);
    }
  };

  const goForgotPassword = () => {
    history.push("/forgot-password");
  };

  const goSignup = () => {
    history.push("/register");
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
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
            <div>
              <IonButton
                type="submit"
                color="dark"
                expand="block"
                size="default"
              >
                Login
              </IonButton>
            </div>
            <IonItem>
              <div className="full text-center">
                <IonButton
                  type="button"
                  fill="clear"
                  color="secondary"
                  onClick={goForgotPassword}
                >
                  ¿Olvidaste tu contraseña?
                </IonButton>
                <IonButton
                  type="button"
                  fill="clear"
                  color="secondary"
                  onClick={goSignup}
                >
                  Registrarse
                </IonButton>
              </div>
            </IonItem>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export { Login };
