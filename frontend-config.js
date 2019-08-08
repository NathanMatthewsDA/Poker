/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as React from 'react';
import * as UICore from '@da/ui-core';

// ------------------------------------------------------------------------------------------------
// Schema version (all config files will need to export this name)
// ------------------------------------------------------------------------------------------------
export const version = {
  schema: 'navigator-config',
  major: 2,
  minor: 0,
};

export function theme(userId, party, role) {
    return (party == "OCC" ? { documentBackground: "#344a83" } :
           party == "DTC" ? { documentBackground: "#4c566e" } : //, colorPrimary: ["#C9C8CA", "White"], colorSecondary: ["#4f93de", "White"] }: //Grey700
           party == "JPMorgan" ? { documentBackground: "Grey" } :
           { documentBackground: "#800000" });
  };
   
var formatTime = function(timestamp) { return timestamp.substring(0, 10) + " " + timestamp.substring(11, 16); };
var formatDate = function(timestamp) { return timestamp.substring(0, 10); };
var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
var formatDateIntoDDMMMYYYY = function(date) { return date.substring(8,10) + "-" + month_names[date.substring(5,7)-1] + "-" + date.substring(0,4); };
var temp = function() {
    console.log(document)
    var link = document.createElement("a");
    link.textContent = "SAVE AS CSV";
    link.download = "file.csv";
    //link.href = "data:text/csv,h1;All Questions\n"
    var x = document.getElementsByClassName("sc-iQKALj bUqlEJ");
    x.appendChild(link);
    location.reload();

    //document.body.appendChild(link);
    //alert("asdasd")
}

var createColumn = function(key, title, projection, width = 100, weight = 0, alignment = "left", sortable = true) {
    var createCell = function (data) {
        let input = {
            argument: UICore.DamlLfValue.toJSON(data.rowData.argument),
            template: data.rowData.template,
            id: data.rowData.id
        }
        return { type: 'text', value: projection(input) };
    };

    return {
        key: key,
        title: title,
        createCell: createCell,
        sortable: sortable,
        width: width,
        weight: weight,
        alignment: alignment
    }
};

// var roles = {
//     type: 'table-view',
//     title: "Roles",
//     source: { type: 'contracts', filter: [ { field: "template.id", value: "Role" } ], search: "", sort: [ { field: "id", direction: "ASCENDING" } ] },
//     columns: [
//         createColumn("id", "ID", x => x.id, 20),
//         createColumn("index1", "Index 1", x => Object.values(x.argument)[0], 50),
//     ]
// },

// var Chips = {
//     type: 'table-view',
//     title: "My Chips",
//     source: { type: 'contracts', filter: [ { field: "template.id", value: ":Chips@" } ], search: "", sort: [ { field: "id", direction: "ASCENDING" } ] },
//     columns: [
//         createColumn("owner", "Owner", x => x.argument.owner, 20),
//     ]
// };

export const customViews = (userId, party, role) => {
    if (party == 'House') {
        return [ 
        {
            type: 'table-view',
            title: "Issued Chips",
            source: { type: 'contracts', filter: [ { field: "template.id", value: ":Chips@" } ], search: "", sort: [ { field: "id", direction: "ASCENDING" } ] },
            columns: [
                createColumn("owner", "Owner", x => x.argument.owner, 20),
                createColumn("quantity", "Quantity", x => x.argument.quantity, 20),
            ]
        }];
    } else if (party == 'Dealer') {
        return [ 
            {
                type: 'table-view',
                title: "Pending Requests",
                source: { type: 'contracts', filter: [ { field: "template.id", value: ":RequestJoinGame@" } ], search: "", sort: [ { field: "id", direction: "ASCENDING" } ] },
                columns: [
                    createColumn("player", "Player", x => x.argument.player, 20),
                    createColumn("stack", "Stack", x => x.argument.stack, 20),
                ]
            },
            {
                type: 'table-view',
                title: "Lobby",
                source: { type: 'contracts', filter: [ { field: "template.id", value: ":Lobby@" } ], search: "", sort: [ { field: "id", direction: "ASCENDING" } ] },
                columns: [
                    createColumn("players", "Players", x => x.argument.players, 20),
                    createColumn("bigBlind", "Big Blind", x => x.argument.bigBlind, 20),
                    createColumn("smallBlind", "Small Blind", x => x.argument.smallBlind, 20),
                ]
            }];
        } else {
            return {};
    }
}


