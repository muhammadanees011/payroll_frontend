import{r as i,b as u,c as r,d as m,e,f as s,j as _,g as b,i as R}from"./index-ce4bfae1.js";const w={class:"grid"},g={class:"col-12 md:col-12 mt-5"},S={class:"formgrid grid"},U={class:"field col-6"},k=e("label",{for:"Forename"},"Payroll ID*",-1),B={class:"field col-6"},D=e("label",{for:"Surname"},"Employment Date",-1),T={class:"formgrid grid mt-3"},F={class:"field col-6"},N=e("label",{for:"Forename"},"Payment Schedule*",-1),C={class:"formgrid grid mt-3"},H={class:"field col-6"},E=e("label",{for:"Forename"},"Salary Type*:",-1),I={key:0,class:"formgrid grid mt-3"},L={class:"field col-6"},M=e("label",null,"Expected work hours per week*",-1),Y={class:"field col-6"},j=e("label",null,"Hourly equivalent*",-1),q={key:1,class:"formgrid grid mt-3"},A={class:"field col-4"},P=e("label",null,"Annual Salary*",-1),W={class:"field col-4"},O=e("label",null,"Monthly Salary*",-1),z={class:"field col-4"},G=e("label",null,"Weekly Salary*",-1),J={class:"field col-4"},K=e("label",null,"Expected work hours per week*",-1),Q={class:"field col-4"},X=e("label",null,"Hourly equivalent",-1),Z={class:"formgrid grid mt-3"},$={class:"field col-12"},x={class:"col-12 md:col-2"},ee={class:"field-radiobutton mb-0"},le=e("label",{for:"option1"},"No",-1),oe={class:"col-12 md:col-2"},te={class:"field-radiobutton mb-0"},se=e("label",{for:"option2"},"Yes",-1),de={key:2,class:"formgrid grid mt-5"},ae={class:"field col-4"},ne=e("label",null,"Date appointed director*",-1),ie={class:"field col-4"},ue=e("label",null,"Calculation method*",-1),re={class:"field col-4"},me=e("label",null,"Date directorship ended *",-1),ce={class:"formgrid grid mt-5"},ye={class:"field col-6",style:{width:"100%"}},he={data(){return{salary:null,salaryTypes:[{name:"Hourly",code:"hour"},{name:"Monthly",code:"monthly"}],hourlyRate:"",hoursWorked:"",monthlyRate:"",bonus:"",deductions:"",radioValue:null,field1:"",field2:"",field3:""}}},ve=Object.assign(he,{__name:"index",setup(pe){const v=i([{name:"Hourly",code:"hour"},{name:"Monthly",code:"monthly"}]),V=i([{name:"Test Schedule",code:"Hr"}]),a=i(null),c=i(null),n=i(null);return(t,l)=>{const d=u("InputText"),y=u("Dropdown"),f=u("Strong"),h=u("RadioButton"),p=u("Button");return r(),m("div",w,[e("div",g,[e("div",S,[e("div",U,[k,s(d,{id:"Forename",type:"text",style:{width:"100%"}})]),e("div",B,[D,s(d,{id:"Surname",type:"date",style:{width:"100%"}})])]),e("div",T,[e("div",F,[N,s(y,{modelValue:c.value,"onUpdate:modelValue":l[0]||(l[0]=o=>c.value=o),options:V.value,optionLabel:"name",placeholder:"Select",style:{width:"100%"}},null,8,["modelValue","options"])])]),e("div",C,[e("div",H,[E,s(y,{modelValue:a.value,"onUpdate:modelValue":l[1]||(l[1]=o=>a.value=o),options:v.value,optionLabel:"name",placeholder:"Select",style:{width:"100%"}},null,8,["modelValue","options"])])]),a.value&&a.value.code==="hour"?(r(),m("div",I,[e("div",L,[M,s(d,{class:"mt-1",modelValue:t.hourlyRate,"onUpdate:modelValue":l[2]||(l[2]=o=>t.hourlyRate=o),type:"text",style:{width:"100%"}},null,8,["modelValue"])]),e("div",Y,[j,s(d,{class:"mt-1",modelValue:t.hourlyRate,"onUpdate:modelValue":l[3]||(l[3]=o=>t.hourlyRate=o),type:"text",style:{width:"100%"}},null,8,["modelValue"])])])):a.value&&a.value.code==="monthly"?(r(),m("div",q,[e("div",A,[P,s(d,{class:"mt-1",modelValue:t.hourlyRate,"onUpdate:modelValue":l[4]||(l[4]=o=>t.hourlyRate=o),type:"text",style:{width:"100%"}},null,8,["modelValue"])]),e("div",W,[O,s(d,{class:"mt-1",modelValue:t.hourlyRate,"onUpdate:modelValue":l[5]||(l[5]=o=>t.hourlyRate=o),type:"text",style:{width:"100%"}},null,8,["modelValue"])]),e("div",z,[G,s(d,{class:"mt-1",modelValue:t.hourlyRate,"onUpdate:modelValue":l[6]||(l[6]=o=>t.hourlyRate=o),type:"text",style:{width:"100%"}},null,8,["modelValue"])]),e("div",J,[K,s(d,{class:"mt-1",modelValue:t.hourlyRate,"onUpdate:modelValue":l[7]||(l[7]=o=>t.hourlyRate=o),type:"text",style:{width:"100%"}},null,8,["modelValue"])]),e("div",Q,[X,s(d,{class:"mt-1",modelValue:t.hourlyRate,"onUpdate:modelValue":l[8]||(l[8]=o=>t.hourlyRate=o),type:"text",style:{width:"100%"}},null,8,["modelValue"])])])):_("",!0),e("div",Z,[e("div",$,[s(f,{for:"Forename"},{default:b(()=>[R("During the current tax year, is/was this employee a director ?")]),_:1})]),e("div",x,[e("div",ee,[s(h,{id:"option1",name:"option",value:"No",modelValue:n.value,"onUpdate:modelValue":l[9]||(l[9]=o=>n.value=o)},null,8,["modelValue"]),le])]),e("div",oe,[e("div",te,[s(h,{id:"option2",name:"option",value:"Yes",modelValue:n.value,"onUpdate:modelValue":l[10]||(l[10]=o=>n.value=o)},null,8,["modelValue"]),se])])]),n.value==="Yes"?(r(),m("div",de,[e("div",ae,[ne,s(d,{class:"mt-1",modelValue:t.hourlyRate,"onUpdate:modelValue":l[11]||(l[11]=o=>t.hourlyRate=o),type:"date",style:{width:"100%"}},null,8,["modelValue"])]),e("div",ie,[ue,s(d,{class:"mt-1",modelValue:t.hourlyRate,"onUpdate:modelValue":l[12]||(l[12]=o=>t.hourlyRate=o),type:"text",style:{width:"100%"}},null,8,["modelValue"])]),e("div",re,[me,s(d,{class:"mt-1",modelValue:t.hourlyRate,"onUpdate:modelValue":l[13]||(l[13]=o=>t.hourlyRate=o),type:"date",style:{width:"100%"}},null,8,["modelValue"])])])):_("",!0),e("div",ce,[e("div",ye,[s(p,{label:"Save And Finish Later",severity:"secondary",class:"mb-2 mr-2"}),s(p,{label:"Continue",severity:"success",class:"mb-2 mr-2"})])])])])}}});export{ve as default};
