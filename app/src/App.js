import logo from './logo.svg';
import './App.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useEffect, useState } from 'react';

function App() {
  const [gardes, setGardes] = useState([]);
  const  [gardesFormated, setGradeFormated]= useState([]) 
  useEffect(()=> {
      var url = "https://maelgardeapi.azurewebsites.net/gardes";

    // Effectuer l'appel à l'API dans le hook useEffect
    fetch(url)
      .then(response => response.json())
      .then(result => {
        setGardes(result); // Mettre à jour l'état avec les données de l'API       
        setGradeFormated([])
        let tmp = []
        result.gardesdata.forEach(element => {
          tmp.push({
            title: element.nom,
            start: element.dateDebut,
            end : element.dateFind,
            backgroundColor : element.garde == "Bastien" ? "blue" : "red",
          })
        });
        setGradeFormated(tmp)
        console.log(result)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, [])
  return (
    <div className="App">
     <h1>Garde de Mael</h1>
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={gardesFormated}
      />
      
    </div>
  );
}

export default App;
