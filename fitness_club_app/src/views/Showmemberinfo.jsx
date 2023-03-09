import React, {useEffect, useState} from "react";
import supabase from "../services/supabase";

function ShowMemberInfo(props) {
    const { clubNumber } = props;
    const [clients, setClients] = useState([]);

    useEffect(() => {
        async function fetchClients() {
            const { data, error } = await supabase
                .from('Clients')
                .select("id, club_number, name, surname, date_bd, height")
                .eq('club_number', clubNumber);

            if (error) {
                console.error(error);
                setErrorMessage("Error occurred while fetching data");
            } else {
                setClients(data);
            }
        }

        fetchClients();
    }, [clubNumber]);

    return (
            <div>
                {clients.map((client) => (
                    <div className="member-info" key={client.id}>
                        <div>First name: <span className="test_value">{client.name}</span></div>
                        <div>Last name: <span className="test_value">{client.surname}</span></div>
                        <div>Date of birth: <span className="test_value">{client.date_bd}</span></div>
                        <div>Height: <span className="test_value">{client.height}</span></div>
                    </div>
                ))}
            </div>
    );
}

export default ShowMemberInfo;