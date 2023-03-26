import SurveyName from "@/components/Auth/Layout/survey-name.js";
import SurveyEmail from "@/components/Auth/Layout/survey-email";
import SelectSurvey from "@/components/Auth/Layout/select-survey";
import CompanyCatSurvey from "@/components/Auth/Layout/company-category-survey";
import FeatureSurvey from "@/components/Auth/Layout/features-survey";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";

export default function Survey() {
  return (
    <BoxContainerWithFilterIconWrapper>
      {/* <SurveyName /> */}
      {/* <SurveyEmail/> */}
      {/* <SelectSurvey/> */}
      {/* <CompanyCatSurvey/> */}
      <FeatureSurvey/>
    </BoxContainerWithFilterIconWrapper>
  );
}
