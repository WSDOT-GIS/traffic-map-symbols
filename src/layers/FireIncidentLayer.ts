import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import simpleRenderer from "@arcgis/core/renderers/SimpleRenderer"
import fireIncidentSymbol from "@/symbols/FireIncidentSymbol"
import Field from "@arcgis/core/layers/support/Field"

const fireIncidentRenderer = new simpleRenderer({
    symbol: fireIncidentSymbol
})

const fields = [
    new Field({ name: "OBJECTID ", type: "oid", alias: "OBJECTID", length: 0}),
    new Field({ name: "ABCDMisc ", type: "string", alias: "ABCD Misc", length: 4}),
    new Field({ name: "ADSPermissionState ", type: "string", alias: "ADS Permission State", length: 25}),
    new Field({ name: "CalculatedAcres ", type: "double", alias: "Calculated Acres", nullable:  true}),
    new Field({ name: "ContainmentDateTime ", type: "date", alias: "Containment Date Time", length: 8}),
    new Field({ name: "ControlDateTime ", type: "date", alias: "Control Date Time", length: 8}),
    new Field({ name: "DailyAcres ", type: "double", alias: "Daily Acres", nullable:  true}),
    new Field({ name: "DiscoveryAcres ", type: "double", alias: "Discovery Acres", nullable:  true}),
    new Field({ name: "DispatchCenterID ", type: "string", alias: "Dispatch Center ID", length: 6}),
    new Field({ name: "EstimatedCostToDate ", type: "double", alias: "Estimated Cost To Date", nullable:  true}),
    new Field({ name: "FinalFireReportApprovedByTitle ", type: "string", alias: "Final Fire Report Approved By Title", length: 100}),
    new Field({ name: "FinalFireReportApprovedByUnit ", type: "string", alias: "Final Fire Report Approved By Unit", length: 6}),
    new Field({ name: "FinalFireReportApprovedDate ", type: "date", alias: "Final Fire Report Approved Date", length: 8}),
    new Field({ name: "FireBehaviorGeneral ", type: "string", alias: "Fire Behavior General", length: 20}),
    new Field({ name: "FireBehaviorGeneral1 ", type: "string", alias: "Fire Behavior General 1", length: 50}),
    new Field({ name: "FireBehaviorGeneral2 ", type: "string", alias: "Fire Behavior General 2", length: 50}),
    new Field({ name: "FireBehaviorGeneral3 ", type: "string", alias: "Fire Behavior General 3", length: 50}),
    new Field({ name: "FireCause ", type: "string", alias: "Fire Cause", length: 15}),
    new Field({ name: "FireCauseGeneral ", type: "string", alias: "Fire Cause General", length: 100}),
    new Field({ name: "FireCauseSpecific ", type: "string", alias: "Fire Cause Specific", length: 200}),
    new Field({ name: "FireCode ", type: "string", alias: "Fire Code", length: 4}),
    new Field({ name: "FireDepartmentID ", type: "string", alias: "Fire Department ID", length: 5}),
    new Field({ name: "FireDiscoveryDateTime ", type: "date", alias: "Fire Discovery Date Time", length: 8}),
    new Field({ name: "FireMgmtComplexity ", type: "string", alias: "Fire Mgmt Complexity", length: 25}),
    new Field({ name: "FireOutDateTime ", type: "date", alias: "Fire Out Date Time", length: 8}),
    new Field({ name: "FireStrategyConfinePercent ", type: "integer", alias: "Fire Strategy Confine Percent", nullable:  true}),
    new Field({ name: "FireStrategyFullSuppPercent ", type: "integer", alias: "Fire Strategy Full Supp Percent", nullable:  true}),
    new Field({ name: "FireStrategyMonitorPercent ", type: "integer", alias: "Fire Strategy Monitor Percent", nullable:  true}),
    new Field({ name: "FireStrategyPointZonePercent ", type: "integer", alias: "Fire Strategy Point Zone Percent", nullable:  true}),
    new Field({ name: "FSJobCode ", type: "string", alias: "FS Job Code", length: 2}),
    new Field({ name: "FSOverrideCode ", type: "string", alias: "FS Override Code", length: 4}),
    new Field({ name: "GACC ", type: "string", alias: "Geographic Area Coordination Center Code", length: 50}),
    new Field({ name: "ICS209ReportDateTime ", type: "date", alias: "ICS209 Report Date Time", length: 8}),
    new Field({ name: "ICS209ReportForTimePeriodFrom ", type: "date", alias: "ICS209 Report For Time Period From", length: 8}),
    new Field({ name: "ICS209ReportForTimePeriodTo ", type: "date", alias: "ICS209 Report For Time Period To", length: 8}),
    new Field({ name: "ICS209ReportStatus ", type: "string", alias: "ICS209 Report Status", length: 1}),
    new Field({ name: "IncidentManagementOrganization ", type: "string", alias: "Incident Management Organization", length: 255}),
    new Field({ name: "IncidentName ", type: "string", alias: "Incident Name", length: 50}),
    new Field({ name: "IncidentShortDescription ", type: "string", alias: "Incident Short Description", length: 80}),
    new Field({ name: "IncidentTypeCategory ", type: "string", alias: "Incident Type Category", length: 2}),
    new Field({ name: "IncidentTypeKind ", type: "string", alias: "Incident Type Kind", length: 2}),
    new Field({ name: "InitialLatitude ", type: "double", alias: "Initial Latitude", nullable:  true}),
    new Field({ name: "InitialLongitude ", type: "double", alias: "Initial Longitude", nullable:  true}),
    new Field({ name: "InitialResponseAcres ", type: "double", alias: "Initial Response Acres", nullable:  true}),
    new Field({ name: "InitialResponseDateTime ", type: "date", alias: "Initial Response Date Time", length: 8}),
    new Field({ name: "IrwinID ", type: "guid", alias: "Irwin ID", length: 38}),
    new Field({ name: "IsFireCauseInvestigated ", type: "integer", alias: "Is Fire Cause Investigated", nullable:  true}),
    new Field({ name: "IsFireCodeRequested ", type: "integer", alias: "Is Fire Code Requested", nullable:  true}),
    new Field({ name: "IsFSAssisted ", type: "integer", alias: "Is FS Assisted", nullable:  true}),
    new Field({ name: "IsMultiJurisdictional ", type: "integer", alias: "Is Multi Jurisdictional", nullable:  true}),
    new Field({ name: "IsReimbursable ", type: "integer", alias: "Is Reimbursable", nullable:  true}),
    new Field({ name: "IsTrespass ", type: "integer", alias: "Is Trespass", nullable:  true}),
    new Field({ name: "IsUnifiedCommand ", type: "integer", alias: "Is Unified Command", nullable:  true}),
    new Field({ name: "LocalIncidentIdentifier ", type: "string", alias: "Local Incident Identifier", length: 10}),
    new Field({ name: "PercentContained ", type: "double", alias: "Percent Contained", nullable:  true}),
    new Field({ name: "PercentPerimeterToBeContained ", type: "double", alias: "Percent Perimeter To Be Contained", nullable:  true}),
    new Field({ name: "POOCity ", type: "string", alias: "POO City", length: 50}),
    new Field({ name: "POOCounty ", type: "string", alias: "POO County", length: 100}),
    new Field({ name: "POODispatchCenterID ", type: "string", alias: "POO Dispatch Center ID", length: 6}),
    new Field({ name: "POOFips ", type: "string", alias: "POO Fips", length: 5}),
    new Field({ name: "POOJurisdictionalAgency ", type: "string", alias: "POO Jurisdictional Agency", length: 50}),
    new Field({ name: "POOJurisdictionalUnit ", type: "string", alias: "POO Jurisdictional Unit", length: 6}),
    new Field({ name: "POOJurisdictionalUnitParentUnit ", type: "string", alias: "POO Jurisdictional Unit Parent Unit", length: 6}),
    new Field({ name: "POOLandownerCategory ", type: "string", alias: "POO Landowner Category", length: 7}),
    new Field({ name: "POOLandownerKind ", type: "string", alias: "POO Landowner Kind", length: 7}),
    new Field({ name: "POOLegalDescPrincipalMeridian ", type: "string", alias: "POO Legal Desc Principal Meridian", length: 30}),
    new Field({ name: "POOLegalDescQtr ", type: "string", alias: "POO Legal Desc Qtr", length: 2}),
    new Field({ name: "POOLegalDescQtrQtr ", type: "string", alias: "POO Legal Desc Qtr Qtr", length: 2}),
    new Field({ name: "POOLegalDescRange ", type: "string", alias: "POO Legal Desc Range", length: 5}),
    new Field({ name: "POOLegalDescSection ", type: "integer", alias: "POO Legal Desc Section", nullable:  true}),
    new Field({ name: "POOLegalDescTownship ", type: "string", alias: "POO Legal Desc Township", length: 5}),
    new Field({ name: "POOPredictiveServiceAreaID ", type: "string", alias: "POO Predictive Service Area ID", length: 6}),
    new Field({ name: "POOProtectingAgency ", type: "string", alias: "POO Protecting Agency", length: 50}),
    new Field({ name: "POOProtectingUnit ", type: "string", alias: "POO Protecting Unit", length: 6}),
    new Field({ name: "POOState ", type: "string", alias: "POO State", length: 6}),
    new Field({ name: "PredominantFuelGroup ", type: "string", alias: "Predominant Fuel Group", length: 100}),
    new Field({ name: "PredominantFuelModel ", type: "string", alias: "Predominant Fuel Model", length: 100}),
    new Field({ name: "PrimaryFuelModel ", type: "string", alias: "Primary Fuel Model", length: 30}),
    new Field({ name: "SecondaryFuelModel ", type: "string", alias: "Secondary Fuel Model", length: 30}),
    new Field({ name: "TotalIncidentPersonnel ", type: "integer", alias: "Total Incident Personnel", nullable:  true}),
    new Field({ name: "UniqueFireIdentifier ", type: "string", alias: "Unique Fire Identifier", length: 22}),
    new Field({ name: "WFDSSDecisionStatus ", type: "string", alias: "WFDSS Decision Status", length: 20}),
    new Field({ name: "CreatedBySystem ", type: "string", alias: "Created By System", length: 255}),
    new Field({ name: "ModifiedBySystem ", type: "string", alias: "Modified By System", length: 255}),
    new Field({ name: "IsDispatchComplete ", type: "integer", alias: "Is Dispatch Complete", nullable:  true}),
    new Field({ name: "OrganizationalAssessment ", type: "string", alias: "Organizational Assessment", length: 256}),
    new Field({ name: "StrategicDecisionPublishDate ", type: "date", alias: "Strategic Decision Publish Date", length: 8}),
    new Field({ name: "CreatedOnDateTime_dt ", type: "date", alias: "Created On Date Time", length: 8}),
    new Field({ name: "ModifiedOnDateTime_dt ", type: "date", alias: "Modified On Date Time", length: 8}),
    new Field({ name: "Source ", type: "string", alias: "Source", length: 25}),
    new Field({ name: "GlobalID ", type: "global-id", alias: "GlobalID", length: 38}),
]


let layer: FeatureLayer | undefined;

export const initLayer = (url: string): FeatureLayer => {
    layer = new FeatureLayer({
        id: "fire-incidents-layer",
        url: url,
        title: "Fire Incidents",
        renderer: fireIncidentRenderer,
        visible: false,
        fields: fields,
        definitionExpression: "POOState= 'US-WA'"
    });
    return layer;
}

const getLayer = (): FeatureLayer => {
    if (!layer) {
        throw "Fire Incident is not ready yet!";
    }
    return layer;
}

export default getLayer
