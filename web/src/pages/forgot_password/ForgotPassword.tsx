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

enum Status {
  SEND_CODE = 1,
  CHANGE_PASSWORD = 2,
}

const ForgotPassword: React.FC = () => {
  const [username, setUsername] = useState<string | null | undefined>();
  const [code, setCode] = useState<string | null | undefined>();
  const [newPassword, setNewPassword] = useState<string | null | undefined>();
  const [status, setStatus] = useState<Status>(Status.SEND_CODE);
  const [formErrors, setFormErrors] = useState<FormErrors>({ message: "" });
  const [showInfo, setShowInfo] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const submit = async () => {
    try {
      switch (status) {
        case Status.SEND_CODE:
          await sendCode();
          setStatus(Status.CHANGE_PASSWORD);
          break;
        case Status.CHANGE_PASSWORD:
          await changePassword();
          setShowMessage(true);
          setStatus(Status.SEND_CODE);
          break;
        default:
          break;
      }
    } catch (err) {
      setFormErrors(err?.response?.data ? err.response.data : err);
      setShowAlert(true);
    }
  };

  const changePassword = async () => {
    await axios.post(
      "http://127.0.0.1:3000/oauth/confirm_password",
      {
        username,
        code,
        newPassword,
      }
    );
  };

  const sendCode = async () => {
    await axios.post(
      "http://127.0.0.1:3000/oauth/forgot_password",
      {
        username,
      }
    );
    setShowInfo(true);
  };

  const goLogin = () => {
    history.push("/login");
  }

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recuperar Password</IonTitle>
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
            message="Código enviado"
            duration={1500}
          />
          <IonToast
            position="top"
            isOpen={showMessage}
            onDidDismiss={() => setShowMessage(false)}
            message="Contraseña actualizada"
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
            {status === Status.CHANGE_PASSWORD && (
              <>
                <IonItem>
                  <IonLabel position="stacked">Code</IonLabel>
                  <IonInput
                    type="text"
                    name="code"
                    autocomplete="off"
                    placeholder="Code"
                    required={true}
                    onIonChange={(e) => setCode(e.detail.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Nueva contraseña</IonLabel>
                  <IonInput
                    type="password"
                    name="password"
                    autocomplete="off"
                    placeholder="Nueva contraseña"
                    onIonChange={(e) => setNewPassword(e.detail.value)}
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
                {status === Status.SEND_CODE
                  ? "Enviar código"
                  : "Recuperar contraseña"}
              </IonButton>
            </div>
            <IonItem>
              <IonButton type="button" fill="clear" color="secondary" onClick={goLogin}>
                Ir a Login
              </IonButton>
            </IonItem>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export { ForgotPassword };
