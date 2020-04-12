'use strict';
const fs = require('fs');
const json = require('jsonfile');
const axios = require('axios');
const cheerio = require('cheerio');

const state = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
]

let i = 0;
let states = [];
state.forEach(STATE => {
    // 49120 is for TORNADO
    // 49124 is for HURRICANE
    // 49112 is for FLOOD
    // 49121 is for FIRE

    i += 1;
    const urlStart = 'https://www.fema.gov/disasters?field_dv2_state_territory_tribal_value_selective=';
    const urlState = STATE;
    const urlEnd = '&field_dv2_incident_type_tid=49121&field_dv2_declaration_type_value=All&field_dv2_incident_begin_value%5Bvalue%5D%5Bmonth%5D=&field_dv2_incident_begin_value%5Bvalue%5D%5Byear%5D=&field_dv2_incident_end_value%5Bvalue%5D%5Bmonth%5D=&field_dv2_incident_end_value%5Bvalue%5D%5Byear%5D=';

    const url = urlStart + urlState + urlEnd

    axios(url)
        .then(response => {

            const html = response.data;
            const $ = cheerio.load(html);
            const statsTable = $('.views-field-disaster-listing-incident-date'); // 
            
            const totalString = statsTable.text();
            let splitted = totalString.split("Incident period: ");
        
            splitted.splice(0, 1);
            let splittedA = [];
            let splittedB = [STATE];
            splittedA.push(splittedB);
            splitted.forEach(DATA => {
                if (DATA.includes(" to ")) {
                    const index = DATA.indexOf(' to ');
                    splittedA.push(DATA.substr(0, index));

                } else {
                    splittedA.push(DATA);
                }

            })

            console.log(splittedA);

            // states.push([STATE, [splittedA]])
            // console.log(splittedA);
        }).then(() => {
            console.log();
        })

})