import React, { useEffect, useState } from "react";
import ContactData from "./ContactData";
import LocationMap from "./LocationMap";
import './ContactPageStyles.css';
import { XMLParser } from 'fast-xml-parser';
import axios from "axios";

function ContactPage() {
  const [contactData, setContactData] = useState({
    phone: '',
    email: '',
    address: {
      city: '',
      street: '',
      buildingNumber: ''
    },
    coordinates: null
  });

  useEffect(() => {
    const parseXML = (xmlString) => {
      const parser = new XMLParser();
      return parser.parse(xmlString);
    };

    const fetchContactData = async () => {
      try {
        const response = await axios.get('/src/assets/xml/contactData.xml', {
          headers: { 'Content-Type': 'application/xml; charset=utf-8' }
        });

        const xmlData = response.data;
        const result = parseXML(xmlData);
        console.log('Parsed XML Data:', result);

        const data = result.cData;
        setContactData({
          phone: data.phone,
          email: data.email,
          address: {
            city: data.address.city,
            street: data.address.street,
            buildingNumber: data.address.buildingNumber
          },
          coordinates: {
            longitude: parseFloat(data.coordinates.longitude),
            latitude: parseFloat(data.coordinates.latitude)
          }
        });
      } catch (error) {
        console.error('Error fetching and parsing XML:', error);
      }
    };

    fetchContactData();
  }, []);

  return (
    <div className="pageContent">
      <ContactData
        phoneNumber={contactData.phone}
        address={`${contactData.address.city} ${contactData.address.street} ${contactData.address.buildingNumber}`}
        email={contactData.email}
      />
      {contactData.coordinates && (
        <LocationMap
          latitude={contactData.coordinates.latitude}
          longitude={contactData.coordinates.longitude}
          zoomLevel={13}
          markers={[{ geocode: [contactData.coordinates.latitude, contactData.coordinates.longitude] }]}
        />
      )}
    </div>
  );
}

export default ContactPage;
