import React from "react";
import {
  IonContent,
  IonHeader,
  IonButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const session = JSON.parse(localStorage.getItem("session") || "{}");
  const history = useHistory();

  const logout = () => {
    localStorage.clear();

    history.push("/login");
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inicio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="center">
          <div className="text-center">
            <h1>Bienvenido {session.username}</h1>
            <IonButton
              type="button"
              fill="clear"
              color="primary"
              onClick={logout}
            >
              Cerrar sesión
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export { Home };
