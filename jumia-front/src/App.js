import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { ButtonGroup, Button } from "react-bootstrap";
import axios from "axios";
import { Chart } from "react-google-charts";

function App() {
    const my_local_platform = localStorage.getItem("platform");
    const platformlValue = JSON.parse(my_local_platform);
    const my_local_pageType = localStorage.getItem("pageType");
    const pageTypeValue = JSON.parse(my_local_pageType);

    const my_local_sku = localStorage.getItem("sku");
    const skuValue = JSON.parse(my_local_sku);

    const my_local_userid = localStorage.getItem("local_userid");
    const userIdValue = JSON.parse(my_local_userid);

    const my_local_date = localStorage.getItem("local_date");
    const dateValue = JSON.parse(my_local_date);

    const [filterQuery, setFilterQuery] = useState({
        pageType: pageTypeValue,
        platform: platformlValue,
        sku: skuValue,
        userid: userIdValue,
        date: dateValue,
    });

    const [platform, setPlatform] = useState("");
    const handlePlatformSelect = (e) => {
        setFilterQuery({...filterQuery, platform: e });
        window.sessionStorage.setItem("session_platform", e);
    };

    const [pageType, setPageType] = useState("");
    const handlePageSelect = (e) => {
        setFilterQuery({...filterQuery, pageType: e });
        window.sessionStorage.setItem("session_pageType", e);
    };

    const getSkuValue = (sku_event) => {
        const sku = sku_event.target.value;
        setFilterQuery({...filterQuery, sku });
        window.sessionStorage.setItem("session_sku", sku);
    };

    const getUseridValue = (user_event) => {
        const userId = user_event.target.value;
        setFilterQuery({...filterQuery, userId });
        window.sessionStorage.setItem("session_userid", userId);
    };
    const getDateValue = (date_event) => {
        const date = date_event.target.value;
        setFilterQuery({...filterQuery, date });
        window.sessionStorage.setItem("session_date", date);
    };

    function resetfilters() {
        window.sessionStorage.clear();
        window.localStorage.clear();
        window.location.reload(false);
    }

    function savefilters() {
        const local_platform = window.sessionStorage.getItem("session_platform");
        const local_pageType = window.sessionStorage.getItem("session_pageType");
        const local_sku = window.sessionStorage.getItem("session_sku");
        const local_userid = window.sessionStorage.getItem("session_userid");
        const local_date = window.sessionStorage.getItem("session_date");
        if (local_platform) {
            localStorage.setItem("platform", JSON.stringify(local_platform));
        }
        if (local_pageType) {
            localStorage.setItem("pageType", JSON.stringify(local_pageType));
        }
        if (local_sku) {
            localStorage.setItem("sku", JSON.stringify(local_sku));
        }
        if (local_userid) {
            localStorage.setItem("userId", JSON.stringify(local_userid));
        }
        if (local_date) {
            localStorage.setItem("date", JSON.stringify(local_date));
        }
        sessionStorage.clear();

    }

    const [myData, setMyData] = useState([]);
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/mydata", {
                params: filterQuery,
            })
            .then((res) => setMyData(res.data))
            .then()
            .catch((err) => console.log(err));
    }, [filterQuery]);

    console.log(myData);
    const platformdata = [
        ["Platform", "Type"],
        ["App", myData.app_platform],
        ["mobile", myData.mobile_platform],
        ["desktop", myData.desktop_platform],
    ];
    const platformoptions = {
        title: "Platforms",
    };

    const interactiondata = [
        ["interaction", "Type"],
        ["transaction", myData.transaction_interaction],
        ["add to cart", myData.add_to_cart_interaction],
        ["click", myData.click_interaction],
        ["view", myData.view_interaction],
    ];
    const interactionoptions = {
        title: "Interactions",
    };

    const pagetypedata = [
        ["pageType", "Type"],
        ["Browsing", myData.browsing_pageType],
        ["Searching", myData.search_pageType],
    ];
    const pagetypeoptions = {
        title: "Pagetypes",
    };

    var dict = myData.dates_data;
    var arr = [];
    var my_keys = [];
    for (var key in dict) {
        my_keys.push(key);
        arr.push(dict[key]);
    }
    const combodata = [
        ["Date", "Impression", "Transaction", "Add_to_cart", "Click", "View"],
        [
            my_keys?.[0],
            arr?.[0]?.[0],
            arr?.[0]?.[1],
            arr?.[0]?.[2],
            arr?.[0]?.[3],
            arr?.[0]?.[4],
        ],
        [
            my_keys?.[1],
            arr?.[1]?.[0],
            arr?.[1]?.[1],
            arr?.[1]?.[2],
            arr?.[1]?.[3],
            arr?.[1]?.[4],
        ],
        [
            my_keys?.[2],
            arr?.[2]?.[0],
            arr?.[2]?.[1],
            arr?.[2]?.[2],
            arr?.[2]?.[3],
            arr?.[2]?.[4],
        ],
        [
            my_keys?.[3],
            arr?.[3]?.[0],
            arr?.[3]?.[1],
            arr?.[3]?.[2],
            arr?.[3]?.[3],
            arr?.[3]?.[4],
        ],
        [
            my_keys?.[4],
            arr?.[4]?.[0],
            arr?.[4]?.[1],
            arr?.[4]?.[2],
            arr?.[4]?.[3],
            arr?.[4]?.[4],
        ],
    ];
    const combooptions = {
        title: "Combo chart for Interactions",
        vAxis: { title: "Interactions" },
        hAxis: { title: "Date" },
        seriesType: "bars",
        series: { 5: { type: "line" } },
    };
    var tableapi = myData.breakdown_list;
    console.log(tableapi);
    const tabledata = [
        [
            "Platform",
            "PageType",
            "Total users",
            "Impressions",
            "Clicks",
            "Add to carts",
            "Transactions",
        ],
        [
            tableapi?.[0]?.[0],
            tableapi?.[0]?.[1],
            tableapi?.[0]?.[2],
            tableapi?.[0]?.[3],
            tableapi?.[0]?.[4],
            tableapi?.[0]?.[5],
            tableapi?.[0]?.[6],
        ],
        [
            tableapi?.[1]?.[0],
            tableapi?.[1]?.[1],
            tableapi?.[1]?.[2],
            tableapi?.[1]?.[3],
            tableapi?.[1]?.[4],
            tableapi?.[1]?.[5],
            tableapi?.[1]?.[6],
        ],
        [
            tableapi?.[2]?.[0],
            tableapi?.[2]?.[1],
            tableapi?.[2]?.[2],
            tableapi?.[2]?.[3],
            tableapi?.[2]?.[4],
            tableapi?.[2]?.[5],
            tableapi?.[2]?.[6],
        ],
        [
            tableapi?.[3]?.[0],
            tableapi?.[3]?.[1],
            tableapi?.[3]?.[2],
            tableapi?.[3]?.[3],
            tableapi?.[3]?.[4],
            tableapi?.[3]?.[5],
            tableapi?.[3]?.[6],
        ],
        [
            tableapi?.[4]?.[0],
            tableapi?.[4]?.[1],
            tableapi?.[4]?.[2],
            tableapi?.[4]?.[3],
            tableapi?.[4]?.[4],
            tableapi?.[4]?.[5],
            tableapi?.[4]?.[6],
        ],
    ];
    console.log(myData);
    const tableoptions = {
        title: "Breakdown",
        curveType: "function",
        legend: { position: "bottom" },
        pageSize: 6,
    };
    return ( 
        <div className = "text-center" >
        <ButtonToolbar style={{ marginTop: "17.5px" }} className = "justify-content-space-between"aria-label = "Toolbar with button groups" >
        <ButtonGroup aria-label = "Basic example" >

        <ButtonGroup aria-label = "Basic example" >
        <DropdownButton title = "Platform"
        id = "platform-menu-align-right"
        onSelect = { handlePlatformSelect } >
        <Dropdown.Item eventKey = "app" > App Platform </Dropdown.Item>  
        <Dropdown.Item eventKey = "mobile" > Mobile Platform </Dropdown.Item>  
        <Dropdown.Item eventKey = "desktop" > Desktop Platform </Dropdown.Item>  
        <Dropdown.Item eventKey = "" > Unselect Platform </Dropdown.Item>

        <Dropdown.Divider/>
        </DropdownButton> </ButtonGroup> 
        <ButtonGroup aria-label = "Basic example" >
        <DropdownButton title = "PageType"
        id = "page-type-menu-align-right"
        onSelect = { handlePageSelect } >
        <Dropdown.Item eventKey = "browsing" > Browsing PageType </Dropdown.Item>  
        <Dropdown.Item eventKey = "search" > Search PageType </Dropdown.Item>  
        <Dropdown.Item eventKey = "" > Unselect PageType </Dropdown.Item>

        <Dropdown.Divider/>
        </DropdownButton>  </ButtonGroup>

        <input type = "text" placeholder = "sku" onChange = { getSkuValue }/>  
        <input type = "text"
        placeholder = "user id"
        onChange = { getUseridValue }
        />  
        <input type = "text"
        placeholder = "d/m/yyyy"
        onChange = { getDateValue }
        />  
        <Button onClick = { savefilters }
        variant = "success"
        className = "saveFilters" >
        SaveFilters </Button>

        <Button onClick = { resetfilters }
        variant = "danger"
        className = "resetFilters" >
        Reset Filters </Button> </ButtonGroup > </ButtonToolbar>  
        <Chart chartType = "PieChart"
        data = { platformdata }
        options = { platformoptions }
        width = { "100%" }
        height = { "400px" }/>

        <Chart chartType = "PieChart"
        data = { pagetypedata }
        options = { pagetypeoptions }
        width = { "100%" }
        height = { "400px" }
        />

        <Chart chartType = "PieChart"
        data = { interactiondata }
        options = { interactionoptions }
        width = { "100%" }
        height = { "400px" }
        />  
        <Chart chartType = "ComboChart"
        width = "100%"
        height = "400px"
        data = { combodata }
        options = { combooptions }
        />  
        <Chart chartType = "Table"
        width = "100%"
        height = "400px"
        data = { tabledata }
        options = { tableoptions }/> </div>
    );
}

export default App;