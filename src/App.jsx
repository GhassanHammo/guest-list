import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const response = await fetch(
          "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-ftb-ct-web-pt/guests"
        );
        const data = await response.json();
        setGuests(data.data); // assuming API returns { data: [...] }
      } catch (error) {
        console.error(error);
      }
    }
    fetchGuests();
  }, []);

  return (
    <div className="App">
      <h1>Guest List</h1>
      {!selectedGuest ? (
        <ul>
          {guests.map((guest) => (
            <li
              key={guest.id}
              style={{ cursor: "pointer", marginBottom: "10px" }}
              onClick={() => setSelectedGuest(guest)}
            >
              <strong>{guest.name}</strong> <br />
              {guest.email}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h2>{selectedGuest.name}</h2>
          <p><strong>Email:</strong> {selectedGuest.email}</p>
          <p><strong>Phone:</strong> {selectedGuest.phone}</p>
          <p><strong>Bio:</strong> {selectedGuest.bio}</p>
          <p><strong>Job:</strong> {selectedGuest.job}</p>
          <button onClick={() => setSelectedGuest(null)}>Back</button>
        </div>
      )}
    </div>
  );
}

export default App;