const fullToAbreviations = {
    "Alabama":"AL",
    "Alaska":"AK",
    "Arizona":"AZ",
    "Arkansas":"AR",
    "California":"CA",
    "Colorado":"CO",
    "Connecticut":"CT",
    "Delaware":"DE",
    "Florida":"FL",
    "Georgia":"GA",
    "Hawaii":"HI",
    "Idaho":"ID",
    "Illinois":"IL",
    "Indiana":"IN",
    "Iowa":"IA",
    "Kansas":"KS",
    "Kentucky":"KY",
    "Louisiana":"LA",
    "Maine":"ME",
    "Maryland":"MD",
    "Massachusetts":"MA",
    "Michigan":"MI",
    "Minnesota":"MN",
    "Mississippi":"MS",
    "Missouri":"MO",
    "Montana":"MT",
    "Nebraska":"NE",
    "Nevada":"NV",
    "New Hampshire":"NH",
    "New Jersey":"NJ",
    "New Mexico":"NM",
    "New York":"NY",
    "North Carolina":"NC",
    "North Dakota":"ND",
    "Ohio":"OH",
    "Oklahoma":"OK",
    "Oregon":"OR",
    "Pennsylvania":"PA",
    "Rhode Island":"RI",
    "South Carolina":"SC",
    "South Dakota":"SD",
    "Tennessee":"TN",
    "Texas":"TX",
    "Utah":"UT",
    "Vermont":"VT",
    "Virginia":"VA",
    "Washington":"WA",
    "West Virginia":"WV",
    "Wisconsin":"WI",
    "Wyoming":"WY"
}

const disasterSeverity = (state, disaster) => {
    let aState
    aState=fullToAbreviations[state]

    let days;
    if (disaster == "flood") {
        days = flood[aState];
    } else if (disaster == "fire") {
        days = fire[aState]
    } else if (disaster == "hurricane") {
        days = hurricane[aState]
    } else if (disaster == "tornado") {
        days = tornado[aState];
    }

    if (days){
        return days.length
    }else{
        return 0
    }
    
}



const submissions = document.querySelector('#modal-submission');

submissions.addEventListener('submit', (e) => {
    e.preventDefault();

    const select = document.querySelector('#state-select');
    const state = select.value;

    //console.log(state);

    const disaster = document.querySelector('#disaster-select');
    const naturalDisaster = disaster.value;

    document.getElementById('disasterMap').innerHTML = "<div id='map' style='width: 600px; height: 400px;'></div>"

    
    let days;

    if (naturalDisaster == "flood") {
        days = flood[state];
    } else if (naturalDisaster == "fire") {
        days = fire[state]
    } else if (naturalDisaster == "hurricane") {
        days = hurricane[state]
    } else if (naturalDisaster == "tornado") {
        days = tornado[state];
    }

    let newDays = [];

    days.forEach(day => {
        let newDay = day.substr(day.length - 4, day.length);
        newDays.push(newDay);
    })
    


    let accuracies = 0;

    newDays.forEach(year => {
        let accuracy = 2020 - year;
        let acc = 100 - accuracy;
        
        accuracies += acc;

    })

    const percentage = accuracies / newDays.length;



    //console.log(days);

    //console.log(date(days));

    const userStateDisasterMessage = document.querySelector('#user-state-disaster-message');

    const fullState = abbreviationsToFull[state];

    userStateDisasterMessage.innerHTML = ` You are currently looking at the ${naturalDisaster}s in ${fullState}.`;

    const userAmountOfDisasters = document.querySelector("#user-amount-of-disasters")

    userAmountOfDisasters.innerHTML = ` There have been a total of <b> ${days.length} ${naturalDisaster}s </b> since ${earliestDate(days)}.`

    const userNextDisaster = document.querySelector("#user-next-disaster")

    userNextDisaster.innerHTML = ` The next predicted <b> ${naturalDisaster} </b> based on previous data is on ${date(days)}.`

    const prediction = document.querySelector('#prediction');

    prediction.innerHTML = ` THE PERCENTAGE OF A ${naturalDisaster} HAPPENING IN ${fullState} in 2020 is <b> ${percentage}% </b> `




    console.log(newDays);

    function getColor(d) {
        return d > 1000 ? '#800026' :
            d > 18  ? '#BD0026' :
            d > 15  ? '#E31A1C' :
            d > 12  ? '#FC4E2A' :
            d > 9   ? '#FD8D3C' :
            d > 6   ? '#FEB24C' :
            d > 3   ? '#FED976' :
                        '#FFEDA0';
    }

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

    function onEachFeature(feature, layer) {
        layer.on({
            //mouseover: highlightFeature,
            //mouseout: resetHighlight,
        });
    }



    function style(feature) {
        //console.log(feature.properties.name)
        //console.log(naturalDisaster)
        return {
            fillColor: getColor(disasterSeverity(feature.properties.name, naturalDisaster)),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    let mapboxAccessToken = "pk.eyJ1IjoiZXZhbndhbmcwNCIsImEiOiJjazh4MmY3N2UxMzZwM3BudXc3N3Fqbzl5In0.V8O-tyCtUFvgCfinCp1vmA";
    let map = L.map('map').setView([37.8, -96], 4);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);


    L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);


    //token: pk.eyJ1IjoiZXZhbndhbmcwNCIsImEiOiJjazh4MmY3N2UxMzZwM3BudXc3N3Fqbzl5In0.V8O-tyCtUFvgCfinCp1vmA

    /*
    const mapRun = () => {
        // 40.528061, -99.991693
        // var map = L.map('map').setView([50.84673, 4.35247], 12);
        var map = L.map('map').setView([40.528061, -99.991693], 12);

        L.tileLayer('https://tile.openstreetmap.be/osmbe/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' +
                ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
            maxZoom: 18
        }).addTo(map);

        var marker = L.marker([50.84673, 4.35247]).addTo(map);

        var popup = marker.bindPopup('<b>Hello world!</b><br />I am a popup.');

        popup.openPopup();

    }
    */

   const modal = document.querySelector('#modal-submission');

   M.Modal.getInstance(modal).close();
   submissions.reset();

})