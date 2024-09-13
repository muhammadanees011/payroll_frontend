import p from"./index-e4e9166e.js";import y from"./index-994e7954.js";import{S as D}from"./vue-step-progress.min-473c62ed.js";import{_ as f,b as s,c as n,d as k,e as t,f as i,l,j as a,p as b,k as C,i as m}from"./index-22bf9e45.js";const w={components:{StepProgress:D,"personal-details":p,"employment-details":y,"completion-details":p},data(){return{nestedRouteItems:["Personal Details","Employment Details","Starter Details"],mySteps:[{label:"Personal Details",component:"PersonalDetails"},{label:"Employment Details",component:"EmploymentDetails"},{label:"Complete",component:"CompletionDetails"}],currentStep:0}},computed:{currentComponent(){return this.mySteps[this.currentStep].component}},methods:{nextStep(){this.currentStep=this.currentStep+1},setActiveStep(e){console.log("Step clicked:",e),this.currentStep=e}}},c=e=>(b("data-v-6da66043"),e=e(),C(),e),g={class:"col-12 md:col-12"},B={class:"card card-w-title"},I=c(()=>t("h5",null,"New Employee",-1)),x=c(()=>t("p",{class:"mb-3"},[m("Follow the three steps below to add a new employee to your company payroll."),t("br"),m(" Please make sure all information is accurate.")],-1)),E={class:"col-12 md:col-12"},N={class:"card card-w-title"},P=c(()=>t("br",null,null,-1));function V(e,r,R,j,o,d){const _=s("step-progress"),u=s("personal-details"),S=s("employment-details"),v=s("completion-details"),h=s("Button");return n(),k("div",g,[t("div",B,[I,x,i(_,{steps:o.nestedRouteItems,"current-step":o.currentStep,"active-color":"green","active-thickness":"5","line-thickness":"5","icon-class":"fa fa-check"},null,8,["steps","current-step"]),t("div",E,[t("div",N,[o.currentStep==0?(n(),l(u,{key:0,onSaveDetails:e.saveDetails},null,8,["onSaveDetails"])):a("",!0),o.currentStep==1?(n(),l(S,{key:1,onSaveDetails:e.saveDetails},null,8,["onSaveDetails"])):a("",!0),o.currentStep==2?(n(),l(v,{key:2,onSaveDetails:e.saveDetails},null,8,["onSaveDetails"])):a("",!0),P,i(h,{onClick:r[0]||(r[0]=A=>d.nextStep()),label:"Continue",class:"ml-2 mb-2"})])])])])}const G=f(w,[["render",V],["__scopeId","data-v-6da66043"]]);export{G as default};