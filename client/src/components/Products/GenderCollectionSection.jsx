import React from "react";
import menCollection from "../../assets/mens-collection.webp";
import womenCollection from "../../assets/women-collection.png";
import CollectionCard from "../Cards/CollectionCard";
const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Women's Collection */}
        <CollectionCard
          image={womenCollection}
          title="Women's Collection"
          link="/collections/all?gender=Women"
        />

        {/* Men's Collection */}
        <CollectionCard
          image={menCollection}
          title="Men's Collection"
          link="/collections/all?gender=Men"
        />
      </div>
    </section>
  );
};

export default GenderCollectionSection;
