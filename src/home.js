import footprintApi from './footprintApi';

export default async function goHomeHandler() {
  const countries = await footprintApi.getCountries();
  const country = await footprintApi.getDataForCountry(229);

  return `    
    <center>
      <h1>Welcome to Altruistiq!</h1>
      <div style="display: flex; flex-direction: row;">
        <div style="width: 50%; margin-right: 20px;">
          <h3>Example countries JSON (first 5 results)</h3>
          <pre style="
            text-align: left;
            background: #f8f8f8;
            border: 1px solid #efefef;
            border-radius: 6px;
            padding: 2em;"
          >${JSON.stringify(countries.slice(0, 5), null, 2)}</pre>
        </div>
        <div style="width: 50%;">
          <h3>Example country JSON (first 5 years)</h3>
          <pre style="
            text-align: left;
            background: #f8f8f8;
            border: 1px solid #efefef;
            border-radius: 6px;
            padding: 2em;"
          >${JSON.stringify(country.slice(0, 5), null, 2)}</pre>
        </div>
      </div>
    </center>
`;
}
