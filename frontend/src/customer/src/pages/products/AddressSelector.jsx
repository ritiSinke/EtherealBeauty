import React, { useState, useEffect } from "react";

const AddressSelector = ({ province, setProvince, district, setDistrict, municipality, setMunicipality }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  const apiHeaders = {
    "x-rapidapi-host": "nepal-address3.p.rapidapi.com",
    "x-rapidapi-key": "edfc1bcc3fmsh6dfa92503583514p175bc4jsnf3daa65830d6",
  };

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://nepal-address3.p.rapidapi.com/province", { method: "GET", headers: apiHeaders });
        const data = await response.json();
        setProvinces(data.data.provinces || []);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (province) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(`https://nepal-address3.p.rapidapi.com/districtsByProvince?province=${province}`, {
            method: "GET",
            headers: apiHeaders,
          });
          const data = await response.json();
          setDistricts(data.data.districts || []);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      setMunicipalities([]);
    }
  }, [province]);

  // Fetch municipalities when district changes
  useEffect(() => {
    if (district) {
      const fetchMunicipalities = async () => {
        try {
          const response = await fetch(`https://nepal-address3.p.rapidapi.com/municipalsByDistrict?district=${district}`, {
            method: "GET",
            headers: apiHeaders,
          });
          const data = await response.json();
          setMunicipalities(data.data.municipals || []);
        } catch (error) {
          console.error("Error fetching municipalities:", error);
        }
      };
      fetchMunicipalities();
    } else {
      setMunicipalities([]);
    }
  }, [district]);

  return (
    <section>
      {/* Province Dropdown */}
      <select
        value={province}
        onChange={(e) => {
          setProvince(e.target.value);
          setDistrict("");
          setMunicipality("");
        }}
        className="border p-2 rounded w-full"
      >
        <option value="">Select Province</option>
        {provinces.map((prov, index) => (
          <option key={index} value={prov}>
            {prov}
          </option>
        ))}
      </select>

      {/* District Dropdown */}
      <select
        value={district}
        onChange={(e) => {
          setDistrict(e.target.value);
          setMunicipality("");
        }}
        className="border p-2 rounded w-full"
        disabled={!province}
      >
        <option value="">Select District</option>
        {districts.map((dist, index) => (
          <option key={index} value={dist}>
            {dist}
          </option>
        ))}
      </select>

      {/* Municipality Dropdown */}
      <select
        value={municipality}
        onChange={(e) => setMunicipality(e.target.value)}
        className="border p-2 rounded w-full"
        disabled={!district}
      >
        <option value="">Select Municipality</option>
        {municipalities.map((mun, index) => (
          <option key={index} value={mun}>
            {mun}
          </option>
        ))}
      </select>
    </section>
  );
};

export default AddressSelector;
