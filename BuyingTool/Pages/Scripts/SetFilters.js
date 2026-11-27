//dynamic tables filtered based on what is selected
var filteredRequiredTable = [];
var filteredStylesTable = [];
var filteredOrganizationTable = [];
var filteredAttributesTable = [];
var filteredPeriodPlanTable = [];
//static tables set only once
var requiredTable = [];
var stylesTable = [];
var organizationTable = [];
var periodPlanTable = [];
var attributesTable = [];
//#region sortreference
var areaSortReference = new Map();
var brandSortReference = new Map();
var channelSortReference = new Map();
var collectionSortReference = new Map();
var departmentSortReference = new Map();
var divisionSortReference = new Map();
var periodPlanSortReference = new Map();
//var sizeSortReference = new Map();
var styleSortReference = new Map();
var styleCodeSortReference = new Map();
var territorySortReference = new Map();

function sortreferenceapicall() {
    return $.ajax({
        url: url + sortreferenceapiurl,
        method: "GET",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                switch (data[i]['FieldName']) {
                    case 'Area':
                        areaSortReference.set(data[i]['FieldValue'], data[i]['FieldOrder']);
                        break;
                    case 'Brand':
                        brandSortReference.set(data[i]['FieldValue'], data[i]['FieldOrder']);
                        break;
                    case 'Channel':
                        channelSortReference.set(data[i]['FieldValue'], data[i]['FieldOrder']);
                        break;
                    case 'Collection Age':
                        collectionSortReference.set(data[i]['FieldValue'], data[i]['FieldOrder']);
                        break;
                    case 'Department':
                        departmentSortReference.set(data[i]['FieldValue'], data[i]['FieldOrder']);
                        break;
                    case 'Division':
                        divisionSortReference.set(data[i]['FieldValue'], data[i]['FieldOrder']);
                        break;
                    case 'Plan Period':
                        periodPlanSortReference.set(data[i]['FieldValue'], data[i]['FieldOrder']);
                        break;
                    case 'Size':
                        //sizeSortReference.set(data[i]['FieldValue'], data[i]['FieldOrder']);
                        break;
                    case 'Style':
                        styleSortReference.set(data[i]['FieldValue'], data[i]['FieldOrder']);
                        break;
                    case 'Style Code':
                        styleCodeSortReference.set(data[i]['FieldValue'], data[i]['FieldOrder']);
                        break;
                    case 'Territory':
                        territorySortReference.set(data[i]['FieldValue'], data[i]['FieldOrder']);
                        break;
                }
            }
        }
    })
};

//#endregion
//#region api urls
var url = window.location.origin;
var requiredapiurl = "/api/RequiredFilters";
var idnumber = "";
var styleapiurl = "/api/StyleFilters";
var attributeapiurl = "/api/AttributeFilters";
var organizationapiurl = "/api/OrganizationFilters";
var periodplanapiurl = "/api/PeriodPlanFilters";
var sortreferenceapiurl = "/api/SortReference";

//auth required
var brandsauthapiurl = "/api/Authorizations/GetAuthorizedBrands";
var departmentsauthapiurl = "/api/Authorizations/GetAuthorizedDepartments";
var divisionsauthapiurl = "/api/Authorizations/GetAuthorizedDivisions";

//auth organization
var areasauthapiurl = "/api/Authorizations/GetAuthorizedAreas";
var channelsauthapiurl = "/api/Authorizations/GetAuthorizedChannels";
var countriesauthapiurl = "/api/Authorizations/GetAuthorizedCountries";
var regionsauthapiurl = "/api/Authorizations/GetAuthorizedRegions";
var territoriesauthapiurl = "/api/Authorizations/GetAuthorizedTerritories";
//#endregion
//#region authorization stuff
//auth for required
function getauthbrands() {
    return $.ajax({
        url: url + brandsauthapiurl,
        method: "GET",
        data: {
            "idnumber": idnumber,
        },
    })
};
function getauthdepartments() {
    return $.ajax({
        url: url + departmentsauthapiurl,
        method: "GET",
        data: {
            "idnumber": idnumber,
        },
    })
};
function getauthdivisions() {
    return $.ajax({
        url: url + divisionsauthapiurl,
        method: "GET",
        data: {
            "idnumber": idnumber,
        },
    })
};

//auth for organization
function getauthareas() {
    return $.ajax({
        url: url + areasauthapiurl,
        method: "GET",
        data: {
            "idnumber": idnumber,
        },
        success: function (data) {
            authareas = new Set(data);
        }
    });
};
function getauthchannels() {
    return $.ajax({
        url: url + channelsauthapiurl,
        method: "GET",
        data: {
            "idnumber": idnumber,
        },
        success: function (data) {
            authchannels = new Set(data);
        }
    })
};
function getauthcountries() {
    return $.ajax({
        url: url + countriesauthapiurl,
        method: "GET",
        data: {
            "idnumber": idnumber,
        },
        success: function (data) {
            authcountries = new Set(data);
        }
    })
};
function getauthregions() {
    return $.ajax({
        url: url + regionsauthapiurl,
        method: "GET",
        data: {
            "idnumber": idnumber,
        },
        success: function (data) {
            authregions = new Set(data);
        }
    })
};
function getauthterritories() {
    return $.ajax({
        url: url + territoriesauthapiurl,
        method: "GET",
        data: {
            "idnumber": idnumber,
        },
        success: function (data) {
            authterritories = new Set(data);
        }
    })
};
//#endregion
//#region api call functions for filters
function requiredapicall() {
    if (requiredTable.length == 0) {
        return $.ajax({
            url: url + requiredapiurl,
            method: "GET",
            data: {
                "idnumber": idnumber,
            },
            success: function (data) {
                $.when(getauthbrands(), getauthdepartments(), getauthdivisions()).done(
                    function (authbrand, authdept, authdivisions) {

                        var authbrandset = new Set(authbrand[0]);
                        var authdeptset = new Set(authdept[0]);
                        var authdivisionset = new Set(authdivisions[0]);
                        for (var dataiterator = 0; dataiterator < data.length; dataiterator++) {
                            if (authbrandset.has(data[dataiterator]["Brand"]) && authdeptset.has(data[dataiterator]["Department"]) && authdivisionset.has(data[dataiterator]["Division"])) {
                                requiredTable.push(data[dataiterator]);
                            }
                        }
                    }
                );
            }
        })
    }
    else {
        return;
    }
};
function styleapicall() {
    if (stylesTable.length == 0) {
        return $.ajax({
            url: url + styleapiurl,
            method: "GET",
            data: {
                "idnumber": idnumber,
            },
            success: function (data) {
                stylesTable = data;
                //required inner join styles
            }
        })
    }
    else {
        return;
    }
};
function attributeapicall() {
    if (attributesTable.length == 0) {
        return $.ajax({
            url: url + attributeapiurl,
            method: "GET",
            data: {
                "idnumber": idnumber,
            },
            success: function (data) {
                attributesTable = data;
                //ATTRIBUTES: styles inner join
            }
        })
    }
    else {
        return;
    }
};
function organizationapicall() {
    if (organizationTable.length == 0) {
        return $.ajax({
            url: url + organizationapiurl,
            method: "GET",
            data: {
                "idnumber": idnumber,
            },
            success: function (data) {
                //organizationTable = data;
                //ORGANIZATION : brand inner join
                $.when(getauthareas(), getauthchannels(), getauthcountries(), getauthregions(), getauthterritories()).done(
                    function (authareas, authchannels, authcountries, authregions, authterritories) {
                        var authareaset = new Set(authareas[0]);
                        var authchannelset = new Set(authchannels[0]);
                        var authcountrieset = new Set(authcountries[0]);
                        var authregionset = new Set(authregions[0]);
                        var authterritorieset = new Set(authterritories[0]);

                        for (var dataiterator = 0; dataiterator < data.length; dataiterator++) {
                            if (
                                authareaset.has(data[dataiterator]["Area"]) &&
                                authchannelset.has(data[dataiterator]["Channel"]) &&
                                authcountrieset.has(data[dataiterator]["Country"]) &&
                                authregionset.has(data[dataiterator]["Region"]) &&
                                authterritorieset.has(data[dataiterator]["Territory"])
                            ) {
                                organizationTable.push(data[dataiterator]);
                            }
                        }
                    }
                );
            }
        })
    }
    else {
        return;
    }
};
function periodplanapicall() {
    if (periodPlanTable.length == 0) {
        return $.ajax({
            url: url + periodplanapiurl,
            method: "GET",
            data: {
                "idnumber": idnumber,
            },
            success: function (data) {
                periodPlanTable = data;
            }
        })
    } else {
        return;
    }
};
//#endregion

$(document).ready(function () {
    ShowLoader();
    idnumber = document.getElementById('idnumber').innerHTML;

    $.when(requiredapicall(), styleapicall(), attributeapicall(), organizationapicall(), periodplanapicall(), sortreferenceapicall()).done(function () {

        //sets based on session data
        getSessionRequiredSavedData();
        getSessionAttributesSavedData();
        getSessionStyleSavedData();
        getSessionOrganizationSavedData();

        //initial filtering based on what the user has access to
        initialFilter();
        setValueIfOnlyOneIsAccessible();

        //builds filters tables based only on what is selected within the same category
        buildRequiredFilterTable();
        buildStylesFilterTable();
        buildAttributesFilterTable();
        buildOrganizationFilterTable();


        //sets contents of selections filtered by selections on other categories
        setRequiredFilterTable();
        setStylesFilterTable();
        setAttributesFilterTable();
        setOrganizationFilterTable();
        setPeriodPlanTable();


        HideLoader();
    });
    let displaydone = document.getElementById('displaydone');
    if (displaydone.innerHTML != 'true') {
        let gallery = document.getElementById('options-gallery-panel');
        gallery.style.flex = '1';
    }
    else {
        let gallery = document.getElementById('options-gallery-panel');
        gallery.style.flex = '2';
    }

    //make filters resize according to window size
    resizeFilters();
    window.addEventListener('resize', () => {
        resizeFilters();
    });
});
//#region initial actions
function initialFilter() {
    //shrink styles and attributes based on what you have permission to access
    let selectedBrands = getColumn(requiredTable, 'Brand');
    let selectedDivisions = getColumn(requiredTable, 'Division');
    let selectedDepts = getColumn(requiredTable, 'Department');
    selectedBrands = new Set(selectedBrands);
    selectedDivisions = new Set(selectedDivisions);
    selectedDepts = new Set(selectedDepts);
    stylesTable = stylesTable.filter(row =>
    (
        selectedBrands.has(row.Brand) &&
        selectedDivisions.has(row.Division) &&
        selectedDepts.has(row.Department)
    ));
    let selectedStyles = getColumn(stylesTable, 'Style');
    selectedStyles = new Set(selectedStyles);
    attributesTable = attributesTable.filter(row =>
        (selectedStyles.has(row.Style))
    );
};
function setValueIfOnlyOneIsAccessible() {
    var brand = document.getElementById('dd_brand');
    var division = document.getElementById('dd_division');
    var department = document.getElementById('dd_department');
    var region = document.getElementById('dd_region');
    var country = document.getElementById('dd_country');
    var channel = document.getElementById('dd_channel');
    var territory = document.getElementById('dd_territory');
    var area = document.getElementById('dd_area');
    let availableBrands = getColumn(requiredTable, 'Brand');
    let availableDivisions = getColumn(requiredTable, 'Division');
    let availableDepts = getColumn(requiredTable, 'Department');
    let availableRegions = getColumn(organizationTable, 'Region');
    let availableCountries = getColumn(organizationTable, 'Country');
    let availableChannels = getColumn(organizationTable, 'Channel');
    let availableTerritories = getColumn(organizationTable, 'Territory');
    let availableAreas = getColumn(organizationTable, 'Area');
    availableBrands = new Set(availableBrands);
    availableDivisions = new Set(availableDivisions);
    availableDepts = new Set(availableDepts);
    availableRegions = new Set(availableRegions);
    availableCountries = new Set(availableCountries);
    availableChannels = new Set(availableChannels);
    availableTerritories = new Set(availableTerritories);
    availableAreas = new Set(availableAreas);
    if (availableBrands.size == 1) {
        let arr = Array.from(availableBrands);
        populateSelect(arr[0], brand);
    }
    if (availableDivisions.size == 1) {
        let arr = Array.from(availableDivisions);
        populateSelect(arr[0], division);
    }
    if (availableDepts.size == 1) {
        let arr = Array.from(availableDepts);
        populateSelect(arr[0], department);
    }
    if (availableRegions.size == 1) {
        let arr = Array.from(availableRegions);
        populateMultiSelect(arr, region);
    }
    if (availableCountries.size == 1) {
        let arr = Array.from(availableCountries);
        populateMultiSelect(arr, country);
    }
    if (availableChannels.size == 1) {
        let arr = Array.from(availableChannels);
        populateMultiSelect(arr, channel);
    }
    if (availableTerritories.size == 1) {
        let arr = Array.from(availableTerritories);
        populateMultiSelect(arr, territory);
    }
    if (availableAreas.size == 1) {
        let arr = Array.from(availableAreas);
        populateMultiSelect(arr, area);
    }

}
//#endregion

//#region button behavior
function changeFilter(element) {
    /* for (i = 0; i < id.length;i++) {
         console.log(id.options[i].value);
     }*/

    ShowLoader();
    switch (element.id) {
        case 'dd_brand':
            buildStylesFilterTable();
            setStylesFilterTable(element.id);
            buildRequiredFilterTable();
            setRequiredFilterTable(element.id);
            buildOrganizationFilterTable();
            setOrganizationFilterTable(element.id);
            buildAttributesFilterTable();
            setAttributesFilterTable();
            break;
        case 'dd_division':
            buildStylesFilterTable();
            setStylesFilterTable(element.id);
            buildRequiredFilterTable();
            setRequiredFilterTable(element.id);
            buildAttributesFilterTable();
            setAttributesFilterTable();
            break;
        case 'dd_department':
            buildStylesFilterTable();
            setStylesFilterTable(element.id);
            buildRequiredFilterTable();
            setRequiredFilterTable(element.id);
            buildAttributesFilterTable();
            setAttributesFilterTable();
            break;
        case 'dd_category':
            buildStylesFilterTable();
            setStylesFilterTable(element.id);
            buildRequiredFilterTable();
            setRequiredFilterTable(element.id);
            buildAttributesFilterTable();
            setAttributesFilterTable();
            break;
        case 'dd_collection':
            buildStylesFilterTable();
            setStylesFilterTable(element.id);
            buildRequiredFilterTable();
            setRequiredFilterTable(element.id);
            buildAttributesFilterTable();
            setAttributesFilterTable();
            break;
        case 'dd_periodplans':
            break;
        default:
            buildRequiredFilterTable();
            setRequiredFilterTable(element.id);
            buildOrganizationFilterTable();
            setOrganizationFilterTable(element.id);
            break;
    }


    HideLoader();
};

function changeStyle(element) {
    ShowLoader();
    buildStylesFilterTable();
    setStylesFilterTable(element.id);
    buildAttributesFilterTable();
    setAttributesFilterTable(element.id);
    buildRequiredFilterTable();
    setRequiredFilterTable(element.id);
    HideLoader();
};
//#endregion

//#region main filter logic
function buildRequiredFilterTable() {
    var brand = document.getElementById('dd_brand');
    var division = document.getElementById('dd_division');
    var department = document.getElementById('dd_department');
    var category = document.getElementById('dd_category');
    var collection = document.getElementById('dd_collection');
    let selectedValues = Array.from(collection.selectedOptions).map(option => option.value);
    selectedValues = new Set(selectedValues);
    //simply filter by whats selected in required
    filteredRequiredTable = requiredTable.filter(row =>
        (brand.value == '' || row.Brand == brand.value) &&
        (division.value == '' || row.Division == division.value) &&
        (department.value == '' || row.Department == department.value) &&
        (category.value == '' || row.Category == category.value) &&
        (selectedValues.size == 0 || (selectedValues.size == 1 && selectedValues.has('')) || selectedValues.has(row.Collection))
    );
};

function setRequiredFilterTable(excludestring = '') {
    var brand = document.getElementById('dd_brand');
    var division = document.getElementById('dd_division');
    var department = document.getElementById('dd_department');
    var category = document.getElementById('dd_category');
    var collection = document.getElementById('dd_collection');
    var brandset = new Set();
    var divisionset = new Set();
    var departmentset = new Set();
    var categoryset = new Set();
    var collectionset = new Set();
    //build filter table
    for (var i = 0; i < filteredRequiredTable.length; i++) {
        brandset.add(filteredRequiredTable[i].Brand);
        divisionset.add(filteredRequiredTable[i].Division);
        departmentset.add(filteredRequiredTable[i].Department);
        categoryset.add(filteredRequiredTable[i].Category);
        collectionset.add(filteredRequiredTable[i].Collection);
    }
    
    var brandset2 = new Set();
    var divisionset2 = new Set();
    var departmentset2 = new Set();
    var categoryset2 = new Set();
    var collectionset2 = new Set();

    //filter styles by whatever attribute you selected IF an attribute is what was changed
    var attributesList = ['dd_color', 'dd_silhouette', 'dd_collectionattri', 'dd_fitcut', 'dd_materialcomposition', 'dd_materialconstruction', 'dd_printtexture', 'dd_productline', 'dd_sleevetype', 'dd_stylecollection', 'dd_subcategory', 'dd_sizegroup', 'dd_origsrp'];
    attributesList = new Set(attributesList);
    if (attributesList.has(excludestring)) {
        var style = document.getElementById('dd_style');
        var stylecode = document.getElementById('dd_stylecode');
        for (let i = 0; i < style.length; i++) {
            var filtered = filteredStylesTable.filter(value => value.Style == style.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    brandset2.add(row.Brand);
                    divisionset2.add(row.Division);
                    departmentset2.add(row.Department);
                    categoryset2.add(row.Category);
                    collectionset2.add(row.Collection);
                }
            }
        }
        for (let i = 0; i < stylecode.length; i++) {
            var filtered = filteredStylesTable.filter(value => value.Style_Code == stylecode.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    brandset2.add(row.Brand);
                    divisionset2.add(row.Division);
                    departmentset2.add(row.Department);
                    categoryset2.add(row.Category);
                    collectionset2.add(row.Collection);
                }
            }
        }
    }

    //simply filter by whatever is selected inside organization
    var region = document.getElementById('dd_region');
    var country = document.getElementById('dd_country');
    var channel = document.getElementById('dd_channel');
    var territory = document.getElementById('dd_territory');
    var area = document.getElementById('dd_area');
    var outlet = document.getElementById('dd_outletType');
    var siteCode = document.getElementById('dd_siteCode');
    var siteName = document.getElementById('dd_siteName');
    var storeGrade = document.getElementById('dd_storeGrade');

    for (let i = 0; i < region.length; i++) {
        if (region.options[i].selected) {
            var filtered = filteredOrganizationTable.filter(value => value.Region == region.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    brandset2.add(row.Brand);
                }
            }
        }
    }
    for (let i = 0; i < country.length; i++) {
        if (country.options[i].selected) {
            var filtered = filteredOrganizationTable.filter(value => value.Country == country.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    brandset2.add(row.Brand);
                }
            }
        }
    }
    for (let i = 0; i < channel.length; i++) {
        if (channel.options[i].selected) {
            var filtered = filteredOrganizationTable.filter(value => value.Channel == channel.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    brandset2.add(row.Brand);
                }
            }
        }
    }
    for (let i = 0; i < territory.length; i++) {
        if (territory.options[i].selected) {
            var filtered = filteredOrganizationTable.filter(value => value.Territory == territory.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    brandset2.add(row.Brand);
                }
            }
        }
    }
    for (let i = 0; i < area.length; i++) {
        if (area.options[i].selected) {
            var filtered = filteredOrganizationTable.filter(value => value.Area == area.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    brandset2.add(row.Brand);
                }
            }
        }
    }
    for (let i = 0; i < outlet.length; i++) {
        if (outlet.options[i].selected) {
            var filtered = filteredOrganizationTable.filter(value => value['Outlet Type'] == outlet.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    brandset2.add(row.Brand);
                }
            }
        }
    }
    for (let i = 0; i < siteCode.length; i++) {
        if (siteCode.options[i].selected) {
            var filtered = filteredOrganizationTable.filter(value => value['Site Code'] == siteCode.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    brandset2.add(row.Brand);
                }
            }
        }
    }
    for (let i = 0; i < siteName.length; i++) {
        if (siteName.options[i].selected) {
            var filtered = filteredOrganizationTable.filter(value => value['Site Name'] == siteName.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    brandset2.add(row.Brand);
                }
            }
        }
    }
    for (let i = 0; i < storeGrade.length; i++) {
        if (storeGrade.options[i].selected) {
            var filtered = filteredOrganizationTable.filter(value => value['Store Grade'] == storeGrade.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    brandset2.add(row.Brand);
                }
            }
        }
    }
    //if something was selected in organization, intersect it with what is selected in required
    if (brandset2.size >= 1) {
        brandset = brandset.intersection(brandset2);
    }
    if (divisionset2.size >= 1) {
        divisionset = divisionset.intersection(divisionset2);
    }
    if (departmentset2.size >= 1) {
        departmentset = departmentset.intersection(departmentset2);
    }
    if (categoryset2.size >= 1) {
        categoryset = categoryset.intersection(categoryset2);
    }
    if (collectionset2.size >= 1) {
        collectionset = collectionset.intersection(collectionset2);
    }
    //do not filter the currently changed select element
    if (excludestring != 'dd_brand') {
        processBrand(brand, brandset);
    }
    else {
        onlyAddBrand(brand, brandset);
    }
    if (excludestring != 'dd_division') {
        processDivision(division, divisionset);
    }
    else {
        onlyAddDivision(division, divisionset);
    }
    if (excludestring != 'dd_department') {
        processDepartment(department, departmentset);
    }
    else {
        onlyAddDepartment(department, departmentset);
    }
    if (excludestring != 'dd_category') {
        processSelect(category, categoryset);
    }
    else {
        onlyAddSelect(category, categoryset);
    }
    if (excludestring != 'dd_collection') {
        processCollection(collection, collectionset);
    }
    else {
        onlyAddCollection(collection, collectionset);
    }
};

function setPeriodPlanTable() {
    var periodplan = document.getElementById('dd_periodplans');
    var periodplanset = new Set();
    for (var i = 0; i < periodPlanTable.length; i++) {
        periodplanset.add(periodPlanTable[i].PlanPeriod);
    }
    processPeriodPlan(periodplan, periodplanset);
}

function buildStylesFilterTable() {
    var brand = document.getElementById('dd_brand');
    var category = document.getElementById('dd_category');
    var collection = document.getElementById('dd_collection');
    var style = document.getElementById('dd_style');
    var stylecode = document.getElementById('dd_stylecode');
    var division = document.getElementById('dd_division');
    var department = document.getElementById('dd_department');
    let selectedCollections = Array.from(collection.selectedOptions).map(option => option.value);
    selectedCollections = new Set(selectedCollections)
   // let selectedStyles = Array.from(style.selectedOptions).map(option => option.value);
   // let selectedStyleCodes = Array.from(stylecode.selectedOptions).map(option => option.value);
    filteredStylesTable = stylesTable.filter(row =>
        (brand.value == '' || row.Brand == brand.value) &&
        (category.value == '' || row.Category == category.value) &&
        (division.value == '' || row.Division == division.value) &&
        (department.value == '' || row.Department == department.value) &&
        (selectedCollections.size == 0 || (selectedCollections.size == 1 && selectedCollections.has('')) || selectedCollections.has(row.Collection))/*&&
        (selectedStyles.length == 0 || (selectedStyles.length == 1 && selectedStyles[0] == '') || selectedStyles.includes(row.Style))&&
        (selectedStyleCodes.length == 0 || (selectedStyleCodes.length == 1 && selectedStyleCodes[0] == '') || selectedStyleCodes.includes(row.Style_Code))*/
    );
};

function setStylesFilterTable(excludestring) {

    var style = document.getElementById('dd_style');
    var stylecode = document.getElementById('dd_stylecode');
    var styleset = new Set();
    var stylecodeset = new Set();
    for (var i = 0; i < filteredStylesTable.length; i++) {
        styleset.add(filteredStylesTable[i].Style);
        stylecodeset.add(filteredStylesTable[i].Style_Code);
    }
    var color = document.getElementById('dd_color');
    var silhouette = document.getElementById('dd_silhouette');
    var collectionattri = document.getElementById('dd_collectionattri');
    var fitcut = document.getElementById('dd_fitcut');
    var materialcomposition = document.getElementById('dd_materialcomposition');
    var materialconstruction = document.getElementById('dd_materialconstruction');
    var printtexture = document.getElementById('dd_printtexture');
    var productline = document.getElementById('dd_productline');
    var sleevetype = document.getElementById('dd_sleevetype');
    var stylecollection = document.getElementById('dd_stylecollection');
    var subcategory = document.getElementById('dd_subcategory');
    var sizegroup = document.getElementById('dd_sizegroup');
    var origsrp = document.getElementById('dd_origsrp');
    var styleset2 = new Set();
    var stylecodeset2 = new Set();
    for (let i = 0; i < style.length; i++) {
        if (style.options[i].selected) {
            var filtered = filteredStylesTable.filter(value => value.Style == style.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    stylecodeset2.add(row.Style_Code);
                }
            }
        }
    }
    for (let i = 0; i < stylecode.length; i++) {
        if (stylecode.options[i].selected) {
            var filtered = filteredStylesTable.filter(value => value.Style_Code == stylecode.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < color.length; i++) {
        if (color.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value.Color == color.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < silhouette.length; i++) {
        if (silhouette.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value.Silhouette == silhouette.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < fitcut.length; i++) {
        if (fitcut.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value['Fit Cut'] == fitcut.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < collectionattri.length; i++) {
        if (collectionattri.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value.Collection == collectionattri.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < materialcomposition.length; i++) {
        if (materialcomposition.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value['Material Composition'] == materialcomposition.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < materialconstruction.length; i++) {
        if (materialconstruction.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value['Material Construction'] == materialconstruction.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < printtexture.length; i++) {
        if (printtexture.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value.PrintTexture == printtexture.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < productline.length; i++) {
        if (productline.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value['Product Line'] == productline.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < sleevetype.length; i++) {
        if (sleevetype.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value['Sleeve Type'] == sleevetype.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < stylecollection.length; i++) {
        if (stylecollection.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value['Style Collection'] == stylecollection.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < subcategory.length; i++) {
        if (subcategory.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value['Sub-Category'] == subcategory.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < sizegroup.length; i++) {
        if (sizegroup.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value.SizeGroup == sizegroup.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    for (let i = 0; i < origsrp.length; i++) {
        if (origsrp.options[i].selected) {
            var filtered = filteredAttributesTable.filter(value => value['Orig SRP'] == origsrp.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    styleset2.add(row.Style);
                }
            }
        }
    }
    if (styleset2.size >= 1) {
        styleset = styleset.intersection(styleset2);
        for (var setcontent of styleset2) {
            var filtered = filteredStylesTable.filter(value => value.Style == setcontent);
            for (var row of filtered) {
                if (row != null) {
                    stylecodeset2.add(row.Style_Code);
                }
            }
        }
    }
    if (stylecodeset2.size >= 1) {
        stylecodeset = stylecodeset.intersection(stylecodeset2);
    }
    if (excludestring != 'dd_style') {
        processStyle(style, styleset);
    }
    else {
        onlyAddStyle(style, styleset);
    }
    if (excludestring != 'dd_stylecode') {
        processStyleCode(stylecode, stylecodeset);
    }
    else {
        onlyAddStyleCode(stylecode, stylecodeset);
    }
};

function buildAttributesFilterTable() {
    var style = document.getElementById('dd_style');
    let selectedValues = Array.from(style.selectedOptions).map(option => option.value);
    selectedValues = new Set(selectedValues);
    if (selectedValues.size == 0 || (selectedValues.size == 1 && selectedValues.has(''))) {
        selectedValues = getColumn(filteredStylesTable, 'Style');
        selectedValues = new Set(selectedValues);
    }
    filteredAttributesTable = attributesTable.filter(row =>
        (selectedValues.size == 0 || (selectedValues.size == 1 && selectedValues.has('')) || selectedValues.has(row.Style))
    );
};

function setAttributesFilterTable(element = '') {

    var color = document.getElementById('dd_color');
    var silhouette = document.getElementById('dd_silhouette');
    var collectionattri = document.getElementById('dd_collectionattri');
    var fitcut = document.getElementById('dd_fitcut');
    var materialcomposition = document.getElementById('dd_materialcomposition');
    var materialconstruction = document.getElementById('dd_materialconstruction');
    var printtexture = document.getElementById('dd_printtexture');
    var productline = document.getElementById('dd_productline');
    var sleevetype = document.getElementById('dd_sleevetype');
    var stylecollection = document.getElementById('dd_stylecollection');
    var subcategory = document.getElementById('dd_subcategory');
    var sizegroup = document.getElementById('dd_sizegroup');
    var origsrp = document.getElementById('dd_origsrp');
    var colorset = new Set();
    var silhouetteset = new Set();
    var collectionattriset = new Set();
    var fitcutset = new Set();
    var materialcompositionset = new Set();
    var materialconstructionset = new Set();
    var printtextureset = new Set();
    var productlineset = new Set();
    var sleevetypeset = new Set();
    var stylecollectionset = new Set();
    var subcategoryset = new Set();
    var sizegroupset = new Set();
    var origsrpset = new Set();
    for (var i = 0; i < filteredAttributesTable.length; i++) {
        colorset.add(filteredAttributesTable[i].Color);
        silhouetteset.add(filteredAttributesTable[i].Silhouette);
        collectionattriset.add(filteredAttributesTable[i].Collection);
        fitcutset.add(filteredAttributesTable[i]['Fit Cut']);
        materialcompositionset.add(filteredAttributesTable[i]['Material Composition']);
        materialconstructionset.add(filteredAttributesTable[i]['Material Construction']);
        printtextureset.add(filteredAttributesTable[i].PrintTexture);
        productlineset.add(filteredAttributesTable[i]['Product Line']);
        sleevetypeset.add(filteredAttributesTable[i]['Sleeve Type']);
        stylecollectionset.add(filteredAttributesTable[i]['Style Collection']);
        subcategoryset.add(filteredAttributesTable[i]['Sub-Category']);
        sizegroupset.add(filteredAttributesTable[i].SizeGroup);
        origsrpset.add(filteredAttributesTable[i]['Orig SRP']);
    }
    var attributesList = ['dd_color', 'dd_silhouette', 'dd_collectionattri', 'dd_fitcut', 'dd_materialcomposition', 'dd_materialconstruction', 'dd_printtexture', 'dd_productline', 'dd_sleevetype', 'dd_stylecollection', 'dd_subcategory', 'dd_sizegroup', 'dd_origsrp'];
    attributesList = new Set(attributesList);
    if (element != '' && attributesList.has(element)) {
        var colorset2 = new Set();
        var silhouetteset2 = new Set();
        var collectionattriset2 = new Set();
        var fitcutset2 = new Set();
        var materialcompositionset2 = new Set();
        var materialconstructionset2 = new Set();
        var printtextureset2 = new Set();
        var productlineset2 = new Set();
        var sleevetypeset2 = new Set();
        var stylecollectionset2 = new Set();
        var subcategoryset2 = new Set();
        var sizegroupset2 = new Set();
        var origsrpset2 = new Set();
        var style = document.getElementById('dd_style');
        for (let i = 0; i < style.length; i++) {
            var filtered = filteredAttributesTable.filter(value => value.Style == style.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    colorset2.add(row.Color);
                    silhouetteset2.add(row.Silhouette);
                    collectionattriset2.add(row.Collection);
                    fitcutset2.add(row['Fit Cut']);
                    materialcompositionset2.add(row['Material Composition']);
                    materialconstructionset2.add(row['Material Construction']);
                    printtextureset2.add(row.PrintTexture);
                    productlineset2.add(row['Product Line']);
                    sleevetypeset2.add(row['Sleeve Type']);
                    stylecollectionset2.add(row['Style Collection']);
                    subcategoryset2.add(row['Sub-Category']);
                    sizegroupset2.add(row.SizeGroup);
                    origsrpset2.add(row['Orig SRP']);
                }
            }
        }
        if (colorset2.size >= 1) {
            colorset = colorset.intersection(colorset2);
        }
        if (silhouetteset2.size >= 1) {
            silhouetteset = silhouetteset.intersection(silhouetteset2);
        }
        if (collectionattriset2.size >= 1) {
            collectionattriset = collectionattriset.intersection(collectionattriset2);
        }
        if (fitcutset2.size >= 1) {
            fitcutset = fitcutset.intersection(fitcutset2);
        }
        if (materialcompositionset2.size >= 1) {
            materialcompositionset = materialcompositionset.intersection(materialcompositionset2);
        }
        if (materialconstructionset2.size >= 1) {
            materialconstructionset = materialconstructionset.intersection(materialconstructionset2);
        }
        if (printtextureset2.size >= 1) {
            printtextureset = printtextureset.intersection(printtextureset2);
        }
        if (productlineset2.size >= 1) {
            productlineset = productlineset.intersection(productlineset2);
        }
        if (sleevetypeset2.size >= 1) {
            sleevetypeset = sleevetypeset.intersection(sleevetypeset2);
        }
        if (stylecollectionset2.size >= 1) {
            stylecollectionset = stylecollectionset.intersection(stylecollectionset2);
        }
        if (subcategoryset2.size >= 1) {
            subcategoryset = subcategoryset.intersection(subcategoryset2);
        }
        if (sizegroupset2.size >= 1) {
            sizegroupset = sizegroupset.intersection(sizegroupset2);
        }
        if (origsrpset2.size >= 1) {
            origsrpset = origsrpset.intersection(origsrpset2);
        }
    }

    if (element != 'dd_color') {
        processMultiSelect(color, colorset);
    }
    else {
        onlyAddMultiSelect(color, colorset);
    }
    if (element != 'dd_silhouette') {
        processMultiSelect(silhouette, silhouetteset);
    }
    else {
        onlyAddMultiSelect(silhouette, silhouetteset);
    }
    if (element != 'dd_collectionattri') {
        processMultiSelect(collectionattri, collectionattriset);
    }
    else {
        onlyAddMultiSelect(collectionattri, collectionattriset);
    }
    if (element != 'dd_fitcut') {
        processMultiSelect(fitcut, fitcutset);
    }
    else {
        onlyAddMultiSelect(fitcut, fitcutset);
    }
    if (element != 'dd_materialcomposition') {
        processMultiSelect(materialcomposition, materialcompositionset);
    }
    else {
        onlyAddMultiSelect(materialcomposition, materialcompositionset);
    }
    if (element != 'dd_materialconstruction') {
        processMultiSelect(materialconstruction, materialconstructionset);
    }
    else {
        onlyAddMultiSelect(materialconstruction, materialconstructionset);
    }
    if (element != 'dd_printtexture') {
        processMultiSelect(printtexture, printtextureset);
    }
    else {
        onlyAddMultiSelect(printtexture, printtextureset);
    }
    if (element != 'dd_productline') {
        processMultiSelect(productline, productlineset);
    }
    else {
        onlyAddMultiSelect(productline, productlineset);
    }
    if (element != 'dd_sleevetype') {
        processMultiSelect(sleevetype, sleevetypeset);
    }
    else {
        onlyAddMultiSelect(sleevetype, sleevetypeset);
    }
    if (element != 'dd_stylecollection') {
        processMultiSelect(stylecollection, stylecollectionset);
    }
    else {
        onlyAddMultiSelect(stylecollection, stylecollectionset);
    }
    if (element != 'dd_subcategory') {
        processMultiSelect(subcategory, subcategoryset);
    }
    else {
        onlyAddMultiSelect(subcategory, subcategoryset);
    }
    if (element != 'dd_sizegroup') {
        processMultiSelect(sizegroup, sizegroupset);
    }
    else {
        onlyAddMultiSelect(sizegroup, sizegroupset);
    }
    if (element != 'dd_origsrp') {
        processOrigSrp(origsrp, origsrpset);
    }
    else {
        onlyAddOrigSrp(origsrp, origsrpset);
    }
};

function buildOrganizationFilterTable() {
    var brand = document.getElementById('dd_brand');
    var sitecode = document.getElementById('dd_siteCode');
    let selectedSiteCode = Array.from(sitecode.selectedOptions).map(option => option.value);
    selectedSiteCode = new Set(selectedSiteCode);
    var sitename = document.getElementById('dd_siteName');
    let selectedSiteName = Array.from(sitename.selectedOptions).map(option => option.value);
    selectedSiteName = new Set(selectedSiteName);
    var storegrade = document.getElementById('dd_storeGrade');
    let selectedStoreGrade = Array.from(storegrade.selectedOptions).map(option => option.value);
    selectedStoreGrade = new Set(selectedStoreGrade);
    filteredOrganizationTable = organizationTable.filter(row =>
        (brand.value == '' || row.Brand == brand.value) &&
        (selectedSiteCode.size == 0 || (selectedSiteCode.size == 1 && selectedSiteCode.has('')) || selectedSiteCode.has(row['Site Code'])) &&
        (selectedSiteName.size == 0 || (selectedSiteName.size == 1 && selectedSiteName.has('')) || selectedSiteName.has(row['Site Name'])) &&
        (selectedStoreGrade.size == 0 || (selectedStoreGrade.size == 1 && selectedStoreGrade.has('')) || selectedStoreGrade.has(row['Store Grade']))
    );
};

function setOrganizationFilterTable(element = '') {

    var region = document.getElementById('dd_region');
    var country = document.getElementById('dd_country');
    var channel = document.getElementById('dd_channel');
    var territory = document.getElementById('dd_territory');
    var area = document.getElementById('dd_area');
    var outlet = document.getElementById('dd_outletType');
    var siteCode = document.getElementById('dd_siteCode');
    var siteName = document.getElementById('dd_siteName');
    var storeGrade = document.getElementById('dd_storeGrade');
    var regionset = new Set();
    var countryset = new Set();
    var channelset = new Set();
    var territoryset = new Set();
    var areaset = new Set();
    var outletset = new Set();
    var siteCodeset = new Set();
    var siteNameset = new Set();
    var storeGradeset = new Set();
    for (var i = 0; i < filteredOrganizationTable.length; i++) {
        regionset.add(filteredOrganizationTable[i].Region);
        countryset.add(filteredOrganizationTable[i].Country);
        channelset.add(filteredOrganizationTable[i].Channel);
        territoryset.add(filteredOrganizationTable[i].Territory);
        areaset.add(filteredOrganizationTable[i].Area);
        outletset.add(filteredOrganizationTable[i]['Outlet Type']);
        siteCodeset.add(filteredOrganizationTable[i]['Site Code']);
        siteNameset.add(filteredOrganizationTable[i]['Site Name']);
        storeGradeset.add(filteredOrganizationTable[i]['Store Grade']);
    }
    var organizationList = ['dd_region', 'dd_country', 'dd_channel', 'dd_territory', 'dd_area', 'dd_outletType', 'dd_siteCode', 'dd_siteName', 'dd_storeGrade'];
    organizationList = new Set(organizationList);
    if (element != '' && organizationList.has(element)) {
        var regionset2 = new Set();
        var countryset2 = new Set();
        var channelset2 = new Set();
        var territoryset2 = new Set();
        var areaset2 = new Set();
        var outletset2 = new Set();
        var siteCodeset2 = new Set();
        var siteNameset2 = new Set();
        var storeGradeset2 = new Set();
        var brand = document.getElementById('dd_brand');
        for (let i = 0; i < brand.length; i++) {
            var filtered = filteredOrganizationTable.filter(value => value.Brand == brand.options[i].value);
            for (var row of filtered) {
                if (row != null) {
                    regionset2.add(row.Region);
                    countryset2.add(row.Country);
                    channelset2.add(row.Channel);
                    territoryset2.add(row.Territory);
                    areaset2.add(row.Area);
                    outletset2.add(row['Outlet Type']);
                    siteCodeset2.add(row['Site Code']);
                    siteNameset2.add(row['Site Name']);
                    storeGradeset2.add(row['Store Grade']);
                }
            }
        }
        if (regionset2.size >= 1) {
            regionset = regionset.intersection(regionset2);
        }
        if (countryset2.size >= 1) {
            countryset = countryset.intersection(countryset2);
        }
        if (channelset2.size >= 1) {
            channelset = channelset.intersection(channelset2);
        }
        if (territoryset2.size >= 1) {
            territoryset2 = territoryset.intersection(territoryset2);
        }
        if (areaset2.size >= 1) {
            areaset = areaset.intersection(areaset2);
        }
        if (outletset2.size >= 1) {
            outletset = outletset.intersection(outletset2);
        }
        if (siteCodeset2.size >= 1) {
            siteCodeset = siteCodeset.intersection(siteCodeset2);
        }
        if (siteNameset2.size >= 1) {
            siteNameset = siteNameset.intersection(siteNameset2);
        }
        if (storeGradeset2.size >= 1) {
            storeGradeset = storeGradeset.intersection(storeGradeset2);
        }
    }
    processMultiSelect(region, regionset);
    processMultiSelect(country, countryset);
    processChannel(channel, channelset);
    processTerritory(territory, territoryset);
    processArea(area, areaset);
    processMultiSelect(outlet, outletset);
    if (element != 'dd_siteCode') {
        processMultiSelect(siteCode, siteCodeset);
    }
    else {
        onlyAddMultiSelect(siteCode, siteCodeset);
    }
    if (element != 'dd_siteName') {
        processMultiSelect(siteName, siteNameset);
    }
    else {
        onlyAddMultiSelect(siteName, siteNameset);
    }
    if (element != 'dd_storeGrade') {
        processStoreGrade(storeGrade, storeGradeset);
    }
    else {
        onlyAddStoreGrade(storeGrade, storeGradeset);
    }

};
//#endregion

//#region private functions
function processSelect(element, set) {
    set = new Set([...set].sort());
    var selection = element.value;
    while (element.length > 0) {
        element.remove(0);
    }
    element.options[0] = new Option('-- Select --', '');
    let counter = 1;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            counter++;
        }
    }
    element.value = selection;
};
function onlyAddSelect(element, set) {
    var selection = element.value;
    while (element.length > 0) {
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort());
    element.options[0] = new Option('-- Select --', '');
    let counter = 1;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            counter++;
        }
    }
    element.value = selection;
};
function processMultiSelect(element, set) {
    set = new Set([...set].sort());
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        element.remove(0);
    }
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function onlyAddMultiSelect(element, set) {
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort());
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
const getColumn = (anArray, columnName) =>
    anArray.map(row => row[columnName]);

//#endregion

//#region field specific sorting

function processBrand(element, set) {
    set = new Set([...set].sort(function (a, b) {
        return brandSortReference.get(a) - brandSortReference.get(b);
    }));
    var selection = element.value;
    while (element.length > 0) {
        element.remove(0);
    }
    element.options[0] = new Option('-- Select --', '');
    let counter = 1;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            counter++;
        }
    }
    element.value = selection;
};
function processDivision(element, set) {
    set = new Set([...set].sort(function (a, b) {
        return divisionSortReference.get(a) - divisionSortReference.get(b);
    }));
    var selection = element.value;
    while (element.length > 0) {
        element.remove(0);
    }
    element.options[0] = new Option('-- Select --', '');
    let counter = 1;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            counter++;
        }
    }
    element.value = selection;
};
function processDepartment(element, set) {
    set = new Set([...set].sort(function (a, b) {
        return departmentSortReference.get(a) - departmentSortReference.get(b);
    }));
    var selection = element.value;
    while (element.length > 0) {
        element.remove(0);
    }
    element.options[0] = new Option('-- Select --', '');
    let counter = 1;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            counter++;
        }
    }
    element.value = selection;
};
function processCollection(element, set) {
    set = new Set([...set].sort(function (a, b) {
        return collectionSortReference.get(a) - collectionSortReference.get(b);
    }));
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        element.remove(0);
    }
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function processArea(element, set) {
    set = new Set([...set].sort(function (a, b) {
        return areaSortReference.get(a) - areaSortReference.get(b);
    }));
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        element.remove(0);
    }
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function processChannel(element, set) {
    set = new Set([...set].sort(function (a, b) {
        return channelSortReference.get(a) - channelSortReference.get(b);
    }));
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        element.remove(0);
    }
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function processPeriodPlan(element, set) {
    set = new Set([...set].sort(function (a, b) {
        return periodPlanSortReference.get(a) - periodPlanSortReference.get(b);
    }));
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        element.remove(0);
    }
    element.options[0] = new Option('-- Select --', '');
    let counter = 1;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
};
function processStyle(element, set) {
    set = new Set([...set].sort(function (a, b) {
        return styleSortReference.get(a) - styleSortReference.get(b);
    }));
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        element.remove(0);
    }
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function processStyleCode(element, set) {
    set = new Set([...set].sort(function (a, b) {
        return styleCodeSortReference.get(a) - styleCodeSortReference.get(b);
    }));
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        element.remove(0);
    }
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function processTerritory(element, set) {
    set = new Set([...set].sort(function (a, b) {
        return territorySortReference.get(a) - territorySortReference.get(b);
    }));
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        element.remove(0);
    }
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function processOrigSrp(element, set) {
    set.delete('null');
    set.delete(null);
    set = Array.from(set);
    set = set.sort(function (a, b) {
        return parseInt(a) - parseInt(b);
    });
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        element.remove(0);
    }
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function onlyAddOrigSrp(element, set) {
    set.delete('null');
    set.delete(null);
    set = Array.from(set);
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        element.remove(0);
    }
    set = set.sort(function (a, b) {
        return parseInt(a) - parseInt(b);
    });
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function onlyAddBrand(element, set) {
    var selection = element.value;
    while (element.length > 0) {
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort(function (a, b) {
        return brandSortReference.get(a) - brandSortReference.get(b);
    }));
    element.options[0] = new Option('-- Select --', '');
    let counter = 1;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            counter++;
        }
    }
    element.value = selection;
};
function onlyAddDivision(element, set) {
    var selection = element.value;
    while (element.length > 0) {
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort(function (a, b) {
        return divisionSortReference.get(a) - divisionSortReference.get(b);
    }));
    element.options[0] = new Option('-- Select --', '');
    let counter = 1;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            counter++;
        }
    }
    element.value = selection;
};
function onlyAddDepartment(element, set) {
    var selection = element.value;
    while (element.length > 0) {
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort(function (a, b) {
        return departmentSortReference.get(a) - departmentSortReference.get(b);
    }));
    element.options[0] = new Option('-- Select --', '');
    let counter = 1;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            counter++;
        }
    }
    element.value = selection;
};
function onlyAddCollection(element, set) {
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort(function (a, b) {
        return collectionSortReference.get(a) - collectionSortReference.get(b);
    }));
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function onlyAddArea(element, set) {
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort(function (a, b) {
        return areaSortReference.get(a) - areaSortReference.get(b);
    }));
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function onlyAddChannel(element, set) {
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort(function (a, b) {
        return channelSortReference.get(a) - channelSortReference.get(b);
    }));
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function onlyAddPeriodPlan(element, set) {
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort(function (a, b) {
        return periodPlanSortReference.get(a) - periodPlanSortReference.get(b);
    }));
    element.options[0] = new Option('-- Select --', '');
    let counter = 1;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
};
function onlyAddStyle(element, set) {
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort(function (a, b) {
        return styleSortReference.get(a) - styleSortReference.get(b);
    }));
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function onlyAddStyleCode(element, set) {
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort(function (a, b) {
        return styleCodeSortReference.get(a) - styleCodeSortReference.get(b);
    }));
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function onlyAddTerritory(element, set) {
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort(function (a, b) {
        return territorySortReference.get(a) - territorySortReference.get(b);
    }));
    let counter = 0;
    for (let value of set) {
        if (value != null && value != 'null' && value != '') {
            element.options[counter] = new Option(value, value);
            if (SelectedList.has(value.toString())) {
                element.options[counter].selected = true;
            }
            counter++;
        }
    }
    element = new MultiSelect(element);
};
function processStoreGrade(element, set) {
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        element.remove(0);
    }
    set = new Set([...set].sort());
    if (set.has('Online')) {
        var a = set['Online'];
        set.delete('Online');
        element.options[0] = new Option('Online', 'Online');
        if (SelectedList.has('Online')) {
            element.options[0].selected = true;
        }
        let counter = 1;
        for (let value of set) {
            if (value != null && value != 'null' && value != '') {
                element.options[counter] = new Option(value, value);
                if (SelectedList.has(value.toString())) {
                    element.options[counter].selected = true;
                }
                counter++;
            }
        }
    }
    else {
        let counter = 0;
        for (let value of set) {
            if (value != null && value != 'null' && value != '') {
                element.options[counter] = new Option(value, value);
                if (SelectedList.has(value.toString())) {
                    element.options[counter].selected = true;
                }
                counter++;
            }
        }
    }
    element = new MultiSelect(element);
};
function onlyAddStoreGrade(element, set) {
    var SelectedList = new Set();
    while (element.length > 0) {
        if (element.options[0].selected) {
            SelectedList.add(element.options[0].value)
        }
        set.add(element.options[0].value);
        element.remove(0);
    }
    set = new Set([...set].sort());
    if (set.has('Online')) {
        set.delete('Online');
        element.options[0] = new Option('Online', 'Online');
        if (SelectedList.has('Online')) {
            element.options[0].selected = true;
        }
        let counter = 1;
        for (let value of set) {
            if (value != null && value != 'null' && value != '') {
                element.options[counter] = new Option(value, value);
                if (SelectedList.has(value.toString())) {
                    element.options[counter].selected = true;
                }
                counter++;
            }
        }
    }
    else {
        let counter = 0;
        for (let value of set) {
            if (value != null && value != 'null' && value != '') {
                element.options[counter] = new Option(value, value);
                if (SelectedList.has(value.toString())) {
                    element.options[counter].selected = true;
                }
                counter++;
            }
        }
    }
    element = new MultiSelect(element);
};

//#endregion

//#region get saved data
function getSessionRequiredSavedData() {
    let sessionBrand = document.getElementById('sessionBrand');
    let sessionDivision = document.getElementById('sessionDivision');
    let sessionCategory = document.getElementById('sessionCategory');
    let sessionDepartment = document.getElementById('sessionDepartment');
    let sessionCollection = document.getElementById('sessionCollection').innerHTML.split(',').sort();
    let sessionPeriodPlan = document.getElementById('sessionPeriodPlan');

    var brand = document.getElementById('dd_brand');
    var division = document.getElementById('dd_division');
    var department = document.getElementById('dd_department');
    var category = document.getElementById('dd_category');
    var collection = document.getElementById('dd_collection');
    let periodplan = document.getElementById('dd_periodplans');

    populateSelect(sessionBrand.innerHTML, brand);
    populateSelect(sessionPeriodPlan.innerHTML, periodplan);
    populateSelect(sessionDivision.innerHTML, division);
    populateSelect(sessionCategory.innerHTML, category);
    populateSelect(sessionDepartment.innerHTML, department);
    populateMultiSelect(sessionCollection, collection);
}

function getSessionStyleSavedData() {

    let sessionStyle = document.getElementById('sessionStyle').innerHTML.split(',').sort();
    let sessionStyleCode = document.getElementById('sessionStyleCode').innerHTML.split(',').sort();
    var stylecode = document.getElementById('dd_stylecode');
    var style = document.getElementById('dd_style');
    populateMultiSelect(sessionStyle, style);
    populateMultiSelect(sessionStyleCode, stylecode);
}

function getSessionOrganizationSavedData() {

    let sessionRegion = document.getElementById('sessionRegion').innerHTML.split(',').sort();
    let sessionCountry = document.getElementById('sessionCountry').innerHTML.split(',').sort();
    let sessionChannel = document.getElementById('sessionChannel').innerHTML.split(',').sort();
    let sessionTerritory = document.getElementById('sessionTerritory').innerHTML.split(',').sort();
    let sessionArea = document.getElementById('sessionArea').innerHTML.split(',').sort();
    let sessionOutletType = document.getElementById('sessionOutletType').innerHTML.split(',').sort();
    let sessionSiteCode = document.getElementById('sessionSiteCode').innerHTML.split(',').sort();
    let sessionSiteName = document.getElementById('sessionSiteName').innerHTML.split(',').sort();
    let sessionStoreGrade = document.getElementById('sessionStoreGrade').innerHTML.split(',').sort();
    var region = document.getElementById('dd_region');
    var country = document.getElementById('dd_country');
    var channel = document.getElementById('dd_channel');
    var territory = document.getElementById('dd_territory');
    var area = document.getElementById('dd_area');
    var outlet = document.getElementById('dd_outletType');
    var siteCode = document.getElementById('dd_siteCode');
    var siteName = document.getElementById('dd_siteName');
    var storeGrade = document.getElementById('dd_storeGrade');
    populateMultiSelect(sessionRegion, region);
    populateMultiSelect(sessionCountry, country);
    populateMultiSelect(sessionChannel, channel);
    populateMultiSelect(sessionTerritory, territory);
    populateMultiSelect(sessionArea, area);
    populateMultiSelect(sessionOutletType, outlet);
    populateMultiSelect(sessionSiteCode, siteCode);
    populateMultiSelect(sessionSiteName, siteName);
    populateMultiSelect(sessionOutletType, outlet);
    populateMultiSelect(sessionStoreGrade, storeGrade);
}

function getSessionAttributesSavedData() {

    let sessionColor = document.getElementById('sessionColor').innerHTML.split(',').sort();
    let sessionSilhouette = document.getElementById('sessionSilhouette').innerHTML.split(',').sort();
    let sessionCollectionAttri = document.getElementById('sessionCollectionAttri').innerHTML.split(',').sort();
    let sessionFitCut = document.getElementById('sessionFitCut').innerHTML.split(',').sort();
    let sessionMaterialComposition = document.getElementById('sessionMaterialComposition').innerHTML.split(',').sort();
    let sessionMaterialConstruction = document.getElementById('sessionMaterialConstruction').innerHTML.split(',').sort();
    let sessionPrintTexture = document.getElementById('sessionPrintTexture').innerHTML.split(',').sort();
    let sessionProductLine = document.getElementById('sessionProductLine').innerHTML.split(',').sort();
    let sessionSleeveType = document.getElementById('sessionSleeveType').innerHTML.split(',').sort();
    let sessionStyleCollection = document.getElementById('sessionStyleCollection').innerHTML.split(',').sort();
    let sessionSubCategory = document.getElementById('sessionSubCategory').innerHTML.split(',').sort();
    let sessionSizeGroup = document.getElementById('sessionSizeGroup').innerHTML.split(',').sort();
    let sessionOrigSrp = document.getElementById('sessionOrigSrp').innerHTML.split(',').sort();

    var color = document.getElementById('dd_color');
    var silhouette = document.getElementById('dd_silhouette');
    var collectionattri = document.getElementById('dd_collectionattri');
    var fitcut = document.getElementById('dd_fitcut');
    var materialcomposition = document.getElementById('dd_materialcomposition');
    var materialconstruction = document.getElementById('dd_materialconstruction');
    var printtexture = document.getElementById('dd_printtexture');
    var productline = document.getElementById('dd_productline');
    var sleevetype = document.getElementById('dd_sleevetype');
    var stylecollection = document.getElementById('dd_stylecollection');
    var subcategory = document.getElementById('dd_subcategory');
    var sizegroup = document.getElementById('dd_sizegroup');
    var origsrp = document.getElementById('dd_origsrp');
    populateMultiSelect(sessionColor, color);
    populateMultiSelect(sessionSilhouette, silhouette);
    populateMultiSelect(sessionCollectionAttri, collectionattri);
    populateMultiSelect(sessionFitCut, fitcut);
    populateMultiSelect(sessionMaterialComposition, materialcomposition);
    populateMultiSelect(sessionMaterialConstruction, materialconstruction);
    populateMultiSelect(sessionPrintTexture, printtexture);
    populateMultiSelect(sessionProductLine, productline);
    populateMultiSelect(sessionSleeveType, sleevetype);
    populateMultiSelect(sessionStyleCollection, stylecollection);
    populateMultiSelect(sessionSubCategory, subcategory);
    populateMultiSelect(sessionSizeGroup, sizegroup);
    populateMultiSelect(sessionOrigSrp, origsrp);
}
function populateSelect(value, element) {
    if (value != '') {
        element.options.add(new Option(value, value));
        element.value = value;
    }
}

function populateMultiSelect(list, element) {
    let counter = 0;
    for (let value in list) {
        if (list[value] != '') {
            element.options[counter] = new Option(list[value], list[value]);
            element.options[counter].selected = true;
        }
        counter++;
    }
    element = new MultiSelect(element);
}
//#endregion

//#region styling functions
function resizeFilters() {
    let panel = document.getElementById('filters-panel');
    let twocolumnthing = document.getElementById('twocolumnthing');
    if (panel.clientWidth > 530) {
        panel.style.flexDirection = 'row';
        twocolumnthing.style.flexDirection = 'row';
    }
    else {
        panel.style.flex = 1;
        panel.style.flexDirection = 'column';
        twocolumnthing.style.flexDirection = 'column';
    }
}
//#endregion