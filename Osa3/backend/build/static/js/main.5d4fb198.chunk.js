(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{39:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(16),o=t.n(c),a=t(3),u=t(2),r=t(4),i=t.n(r),s="/api/persons",l=function(){return i.a.get(s).then((function(e){return e.data}))},d=function(e){return i.a.post(s,e).then((function(e){return e.data}))},h=function(e){return i.a.delete("".concat(s,"/").concat(e))},j=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},f=(t(39),t(0)),b=function(e){var n=e.namesToShow,t=e.setSucceedMessage,c=(e.persons,e.setPersons);return Object(f.jsx)("div",{children:n.map((function(e){return Object(f.jsxs)("div",{children:[e.name," ",e.number,Object(f.jsx)("button",{onClick:function(){window.confirm("Delete ".concat(e.name,"?"))&&(h(e.id),l().then((function(e){c(e)})),t("Deleted ".concat(e.name)),setTimeout((function(){t(null)}),2e3))},children:"delete"})]},e.id)}))})},m=function(e){var n=e.newFilter,t=e.handleFilterChange;return Object(f.jsxs)("div",{children:["filter shown with ",Object(f.jsx)("input",{value:n,onChange:t})]})},g=function(e){var n=e.addName,t=e.newName,c=e.handleNameChange,o=e.newNumber,a=e.handleNumberChange;return Object(f.jsxs)("form",{onSubmit:n,children:["name: ",Object(f.jsx)("input",{value:t,onChange:c}),"number: ",Object(f.jsx)("input",{value:o,onChange:a}),Object(f.jsx)("button",{type:"submit",children:"add"})]})},O=function(e){var n=e.message;return null===n?null:n.includes("Information")||n.includes("validation")?Object(f.jsx)("div",{className:"error",children:n}):Object(f.jsx)("div",{className:"succeed",children:n})},v=function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],o=Object(u.useState)(""),r=Object(a.a)(o,2),i=r[0],s=r[1],h=Object(u.useState)(""),v=Object(a.a)(h,2),p=v[0],w=v[1],x=Object(u.useState)(!0),C=Object(a.a)(x,2),N=C[0],S=C[1],T=Object(u.useState)(""),k=Object(a.a)(T,2),y=k[0],F=k[1],D=Object(u.useState)(null),I=Object(a.a)(D,2),P=I[0],A=I[1];Object(u.useEffect)((function(){console.log("effect"),l().then((function(e){console.log("promise fulfilled"),c(e)}))}),[]),console.log("render",t.length,"persons");var E=N?t:t.filter((function(e){return e.name.toLowerCase().includes(y.toLowerCase())}));console.log(E);return Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(O,{message:P}),Object(f.jsx)(m,{newFilter:y,handleFilterChange:function(e){F(e.target.value),0===e.target.value.length?S(!0):S(!1)}}),Object(f.jsx)("h2",{children:"Add a new"}),Object(f.jsx)(g,{addName:function(e){e.preventDefault();var n=t.find((function(e){return e.name===i}));console.log(n);var o={name:i,number:p,id:i};void 0===n?d(o).then((function(e){c(t.concat(e)),console.log(e),s(""),w(""),A("Added ".concat(i)),setTimeout((function(){A(null)}),5e3)})).catch((function(e){console.log(e.response.data),A(e.response.data.error),setTimeout((function(){A(null)}),5e3)})):window.confirm("".concat(o.name," is already added to phonebook, replace the old number with a new one?"))&&j(n.id,o).then((function(e){c(t.map((function(t){return t.id===n.id?e:t}))),s(""),w(""),A("Changed ".concat(i)),setTimeout((function(){A(null)}),5e3)})).catch((function(e){A("Information of ".concat(i," has already been removed from server")),setTimeout((function(){A(null)}),5e3)}))},newName:i,handleNameChange:function(e){console.log(e.target.value),s(e.target.value)},newNumber:p,handleNumberChange:function(e){console.log(e.target.value),w(e.target.value)}}),Object(f.jsx)("h2",{children:"Numbers"}),Object(f.jsx)(b,{namesToShow:E,setSucceedMessage:A,persons:t,setPersons:c})]})};o.a.render(Object(f.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.5d4fb198.chunk.js.map