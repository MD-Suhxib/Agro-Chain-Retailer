import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Define the data structure interface for type safety
interface DataItem {
  id: string;
  title: string;
  description: string;
  // Add other fields as needed
}

const Cards: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]); // Define state type

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "yourCollectionName"));
      const dataArr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DataItem[]; // Cast the result to DataItem[]
      setData(dataArr); // Setting data from Firebase
    };
    fetchData();
  }, []);

  const cardContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
  };

  return (
    <div style={cardContainerStyle}>
      {data.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

// Props type for the Card component
interface CardProps {
  item: DataItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "300px",
    textAlign: "center",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    marginBottom: "10px",
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: "16px",
    color: "#555",
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{item.title}</h2>
      <p style={descriptionStyle}>{item.description}</p>
      {/* You can add more fields here */}
    </div>
  );
};

export default Cards;
