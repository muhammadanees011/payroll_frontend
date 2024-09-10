import{_ as S,c as n,d as l,e,aC as d,F as y,aV as v,n as b,t as u,aW as h,i as m,b as f,f as C,g as i,l as D,aY as $}from"./index-a6ecd0d2.js";import _ from"./index-3ce0660b.js";import k from"./index-84816d71.js";const P={name:"CustomStepProgress",props:{steps:Array,currentStep:Number,barHeight:{type:String,default:"2px"}},computed:{progressBarStyle(){return{width:`${this.currentStep/(this.steps.length-1)*100}%`}}}},w={class:"step-progress-container"},x={class:"step-number"},A={class:"step-label"};function B(r,s,a,g,c,o){return n(),l("div",w,[e("div",{class:"steps-bar",style:d({height:a.barHeight,top:"20px"})},[e("div",{class:"progress-bar",style:d(o.progressBarStyle)},null,4)],4),(n(!0),l(y,null,v(a.steps,(p,t)=>(n(),l("div",{key:t,class:b(["step",{active:t===a.currentStep}])},[e("div",x,u(t+1),1),e("div",A,[h(r.$slots,"label-"+t,{},()=>[m(u(p),1)],!0)])],2))),128))])}const E=S(P,[["render",B],["__scopeId","data-v-56d4ca4f"]]),N={components:{CustomStepProgress:E,PersonalDetails:_,EmploymentDetails:k,CompletionDetails:_},data(){return{mySteps:[{label:"Personal Details",component:"PersonalDetails"},{label:"Employment Details",component:"EmploymentDetails"},{label:"Complete",component:"CompletionDetails"}],currentStep:0}},computed:{currentComponent(){return this.mySteps[this.currentStep].component}},methods:{setActiveStep(r){console.log("Step clicked:",r),this.currentStep=r}}},V={class:"col-12 md:col-12"},F={class:"card card-w-title"},z=e("h1",null,"Adding a new employee",-1),H=e("p",{class:"mb-3"},[m("Follow the three steps below to add a new employee to your company payroll."),e("br"),m(" Please make sure all information is accurate.")],-1);function I(r,s,a,g,c,o){const p=f("CustomStepProgress");return n(),l("div",V,[e("div",F,[z,H,C(p,{steps:c.mySteps.map(t=>t.label),currentStep:c.currentStep},{"label-0":i(()=>[e("strong",{onClick:s[0]||(s[0]=t=>o.setActiveStep(0))},"Personal Details")]),"label-1":i(()=>[e("strong",{onClick:s[1]||(s[1]=t=>o.setActiveStep(1))},"Employment Details")]),"label-2":i(()=>[e("strong",{onClick:s[2]||(s[2]=t=>o.setActiveStep(2))},"Starter Details")]),_:1},8,["steps","currentStep"]),(n(),D($(o.currentComponent)))])])}const Y=S(N,[["render",I]]);export{Y as default};