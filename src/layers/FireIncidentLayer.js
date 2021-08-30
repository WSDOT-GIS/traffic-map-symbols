"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLayer = void 0;
const tslib_1 = require("tslib");
const FeatureLayer_1 = tslib_1.__importDefault(require("@arcgis/core/layers/FeatureLayer"));
const SimpleRenderer_1 = tslib_1.__importDefault(require("@arcgis/core/renderers/SimpleRenderer"));
const FireIncidentSymbol_1 = tslib_1.__importDefault(require("@/symbols/FireIncidentSymbol"));
const Field_1 = tslib_1.__importDefault(require("@arcgis/core/layers/support/Field"));
const fireIncidentRenderer = new SimpleRenderer_1.default({
    symbol: FireIncidentSymbol_1.default
});
const fields = [
    new Field_1.default({ name: "OBJECTID ", type: "oid", alias: "OBJECTID", length: 0 }),
    new Field_1.default({ name: "ABCDMisc ", type: "string", alias: "ABCD Misc", length: 4 }),
    new Field_1.default({ name: "ADSPermissionState ", type: "string", alias: "ADS Permission State", length: 25 }),
    new Field_1.default({ name: "CalculatedAcres ", type: "double", alias: "Calculated Acres", nullable: true }),
    new Field_1.default({ name: "ContainmentDateTime ", type: "date", alias: "Containment Date Time", length: 8 }),
    new Field_1.default({ name: "ControlDateTime ", type: "date", alias: "Control Date Time", length: 8 }),
    new Field_1.default({ name: "DailyAcres ", type: "double", alias: "Daily Acres", nullable: true }),
    new Field_1.default({ name: "DiscoveryAcres ", type: "double", alias: "Discovery Acres", nullable: true }),
    new Field_1.default({ name: "DispatchCenterID ", type: "string", alias: "Dispatch Center ID", length: 6 }),
    new Field_1.default({ name: "EstimatedCostToDate ", type: "double", alias: "Estimated Cost To Date", nullable: true }),
    new Field_1.default({ name: "FinalFireReportApprovedByTitle ", type: "string", alias: "Final Fire Report Approved By Title", length: 100 }),
    new Field_1.default({ name: "FinalFireReportApprovedByUnit ", type: "string", alias: "Final Fire Report Approved By Unit", length: 6 }),
    new Field_1.default({ name: "FinalFireReportApprovedDate ", type: "date", alias: "Final Fire Report Approved Date", length: 8 }),
    new Field_1.default({ name: "FireBehaviorGeneral ", type: "string", alias: "Fire Behavior General", length: 20 }),
    new Field_1.default({ name: "FireBehaviorGeneral1 ", type: "string", alias: "Fire Behavior General 1", length: 50 }),
    new Field_1.default({ name: "FireBehaviorGeneral2 ", type: "string", alias: "Fire Behavior General 2", length: 50 }),
    new Field_1.default({ name: "FireBehaviorGeneral3 ", type: "string", alias: "Fire Behavior General 3", length: 50 }),
    new Field_1.default({ name: "FireCause ", type: "string", alias: "Fire Cause", length: 15 }),
    new Field_1.default({ name: "FireCauseGeneral ", type: "string", alias: "Fire Cause General", length: 100 }),
    new Field_1.default({ name: "FireCauseSpecific ", type: "string", alias: "Fire Cause Specific", length: 200 }),
    new Field_1.default({ name: "FireCode ", type: "string", alias: "Fire Code", length: 4 }),
    new Field_1.default({ name: "FireDepartmentID ", type: "string", alias: "Fire Department ID", length: 5 }),
    new Field_1.default({ name: "FireDiscoveryDateTime ", type: "date", alias: "Fire Discovery Date Time", length: 8 }),
    new Field_1.default({ name: "FireMgmtComplexity ", type: "string", alias: "Fire Mgmt Complexity", length: 25 }),
    new Field_1.default({ name: "FireOutDateTime ", type: "date", alias: "Fire Out Date Time", length: 8 }),
    new Field_1.default({ name: "FireStrategyConfinePercent ", type: "integer", alias: "Fire Strategy Confine Percent", nullable: true }),
    new Field_1.default({ name: "FireStrategyFullSuppPercent ", type: "integer", alias: "Fire Strategy Full Supp Percent", nullable: true }),
    new Field_1.default({ name: "FireStrategyMonitorPercent ", type: "integer", alias: "Fire Strategy Monitor Percent", nullable: true }),
    new Field_1.default({ name: "FireStrategyPointZonePercent ", type: "integer", alias: "Fire Strategy Point Zone Percent", nullable: true }),
    new Field_1.default({ name: "FSJobCode ", type: "string", alias: "FS Job Code", length: 2 }),
    new Field_1.default({ name: "FSOverrideCode ", type: "string", alias: "FS Override Code", length: 4 }),
    new Field_1.default({ name: "GACC ", type: "string", alias: "Geographic Area Coordination Center Code", length: 50 }),
    new Field_1.default({ name: "ICS209ReportDateTime ", type: "date", alias: "ICS209 Report Date Time", length: 8 }),
    new Field_1.default({ name: "ICS209ReportForTimePeriodFrom ", type: "date", alias: "ICS209 Report For Time Period From", length: 8 }),
    new Field_1.default({ name: "ICS209ReportForTimePeriodTo ", type: "date", alias: "ICS209 Report For Time Period To", length: 8 }),
    new Field_1.default({ name: "ICS209ReportStatus ", type: "string", alias: "ICS209 Report Status", length: 1 }),
    new Field_1.default({ name: "IncidentManagementOrganization ", type: "string", alias: "Incident Management Organization", length: 255 }),
    new Field_1.default({ name: "IncidentName ", type: "string", alias: "Incident Name", length: 50 }),
    new Field_1.default({ name: "IncidentShortDescription ", type: "string", alias: "Incident Short Description", length: 80 }),
    new Field_1.default({ name: "IncidentTypeCategory ", type: "string", alias: "Incident Type Category", length: 2 }),
    new Field_1.default({ name: "IncidentTypeKind ", type: "string", alias: "Incident Type Kind", length: 2 }),
    new Field_1.default({ name: "InitialLatitude ", type: "double", alias: "Initial Latitude", nullable: true }),
    new Field_1.default({ name: "InitialLongitude ", type: "double", alias: "Initial Longitude", nullable: true }),
    new Field_1.default({ name: "InitialResponseAcres ", type: "double", alias: "Initial Response Acres", nullable: true }),
    new Field_1.default({ name: "InitialResponseDateTime ", type: "date", alias: "Initial Response Date Time", length: 8 }),
    new Field_1.default({ name: "IrwinID ", type: "guid", alias: "Irwin ID", length: 38 }),
    new Field_1.default({ name: "IsFireCauseInvestigated ", type: "integer", alias: "Is Fire Cause Investigated", nullable: true }),
    new Field_1.default({ name: "IsFireCodeRequested ", type: "integer", alias: "Is Fire Code Requested", nullable: true }),
    new Field_1.default({ name: "IsFSAssisted ", type: "integer", alias: "Is FS Assisted", nullable: true }),
    new Field_1.default({ name: "IsMultiJurisdictional ", type: "integer", alias: "Is Multi Jurisdictional", nullable: true }),
    new Field_1.default({ name: "IsReimbursable ", type: "integer", alias: "Is Reimbursable", nullable: true }),
    new Field_1.default({ name: "IsTrespass ", type: "integer", alias: "Is Trespass", nullable: true }),
    new Field_1.default({ name: "IsUnifiedCommand ", type: "integer", alias: "Is Unified Command", nullable: true }),
    new Field_1.default({ name: "LocalIncidentIdentifier ", type: "string", alias: "Local Incident Identifier", length: 10 }),
    new Field_1.default({ name: "PercentContained ", type: "double", alias: "Percent Contained", nullable: true }),
    new Field_1.default({ name: "PercentPerimeterToBeContained ", type: "double", alias: "Percent Perimeter To Be Contained", nullable: true }),
    new Field_1.default({ name: "POOCity ", type: "string", alias: "POO City", length: 50 }),
    new Field_1.default({ name: "POOCounty ", type: "string", alias: "POO County", length: 100 }),
    new Field_1.default({ name: "POODispatchCenterID ", type: "string", alias: "POO Dispatch Center ID", length: 6 }),
    new Field_1.default({ name: "POOFips ", type: "string", alias: "POO Fips", length: 5 }),
    new Field_1.default({ name: "POOJurisdictionalAgency ", type: "string", alias: "POO Jurisdictional Agency", length: 50 }),
    new Field_1.default({ name: "POOJurisdictionalUnit ", type: "string", alias: "POO Jurisdictional Unit", length: 6 }),
    new Field_1.default({ name: "POOJurisdictionalUnitParentUnit ", type: "string", alias: "POO Jurisdictional Unit Parent Unit", length: 6 }),
    new Field_1.default({ name: "POOLandownerCategory ", type: "string", alias: "POO Landowner Category", length: 7 }),
    new Field_1.default({ name: "POOLandownerKind ", type: "string", alias: "POO Landowner Kind", length: 7 }),
    new Field_1.default({ name: "POOLegalDescPrincipalMeridian ", type: "string", alias: "POO Legal Desc Principal Meridian", length: 30 }),
    new Field_1.default({ name: "POOLegalDescQtr ", type: "string", alias: "POO Legal Desc Qtr", length: 2 }),
    new Field_1.default({ name: "POOLegalDescQtrQtr ", type: "string", alias: "POO Legal Desc Qtr Qtr", length: 2 }),
    new Field_1.default({ name: "POOLegalDescRange ", type: "string", alias: "POO Legal Desc Range", length: 5 }),
    new Field_1.default({ name: "POOLegalDescSection ", type: "integer", alias: "POO Legal Desc Section", nullable: true }),
    new Field_1.default({ name: "POOLegalDescTownship ", type: "string", alias: "POO Legal Desc Township", length: 5 }),
    new Field_1.default({ name: "POOPredictiveServiceAreaID ", type: "string", alias: "POO Predictive Service Area ID", length: 6 }),
    new Field_1.default({ name: "POOProtectingAgency ", type: "string", alias: "POO Protecting Agency", length: 50 }),
    new Field_1.default({ name: "POOProtectingUnit ", type: "string", alias: "POO Protecting Unit", length: 6 }),
    new Field_1.default({ name: "POOState ", type: "string", alias: "POO State", length: 6 }),
    new Field_1.default({ name: "PredominantFuelGroup ", type: "string", alias: "Predominant Fuel Group", length: 100 }),
    new Field_1.default({ name: "PredominantFuelModel ", type: "string", alias: "Predominant Fuel Model", length: 100 }),
    new Field_1.default({ name: "PrimaryFuelModel ", type: "string", alias: "Primary Fuel Model", length: 30 }),
    new Field_1.default({ name: "SecondaryFuelModel ", type: "string", alias: "Secondary Fuel Model", length: 30 }),
    new Field_1.default({ name: "TotalIncidentPersonnel ", type: "integer", alias: "Total Incident Personnel", nullable: true }),
    new Field_1.default({ name: "UniqueFireIdentifier ", type: "string", alias: "Unique Fire Identifier", length: 22 }),
    new Field_1.default({ name: "WFDSSDecisionStatus ", type: "string", alias: "WFDSS Decision Status", length: 20 }),
    new Field_1.default({ name: "CreatedBySystem ", type: "string", alias: "Created By System", length: 255 }),
    new Field_1.default({ name: "ModifiedBySystem ", type: "string", alias: "Modified By System", length: 255 }),
    new Field_1.default({ name: "IsDispatchComplete ", type: "integer", alias: "Is Dispatch Complete", nullable: true }),
    new Field_1.default({ name: "OrganizationalAssessment ", type: "string", alias: "Organizational Assessment", length: 256 }),
    new Field_1.default({ name: "StrategicDecisionPublishDate ", type: "date", alias: "Strategic Decision Publish Date", length: 8 }),
    new Field_1.default({ name: "CreatedOnDateTime_dt ", type: "date", alias: "Created On Date Time", length: 8 }),
    new Field_1.default({ name: "ModifiedOnDateTime_dt ", type: "date", alias: "Modified On Date Time", length: 8 }),
    new Field_1.default({ name: "Source ", type: "string", alias: "Source", length: 25 }),
    new Field_1.default({ name: "GlobalID ", type: "global-id", alias: "GlobalID", length: 38 }),
];
let layer;
const initLayer = (url) => {
    layer = new FeatureLayer_1.default({
        id: "fire-incidents-layer",
        url: url,
        title: "Fire Incidents",
        renderer: fireIncidentRenderer,
        visible: false,
        fields: fields,
        definitionExpression: "POOState= 'US-WA'"
    });
    return layer;
};
exports.initLayer = initLayer;
const getLayer = () => {
    if (!layer) {
        throw "Fire Incident is not ready yet!";
    }
    return layer;
};
exports.default = getLayer;
//# sourceMappingURL=FireIncidentLayer.js.map