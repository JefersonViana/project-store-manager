const data = [
{
  id: 1,
  name: 'Martelo de Thor',
},
{
  id: 2,
  name: 'Traje de encolhimento',
},
{
  id: 3,
  name: 'Escudo do CapitÃ£o AmÃ©rica',
}];
const dataModel = [
{
id: 1,
name: 'Martelo de Thor',
},
{
id: 2,
name: 'Traje de encolhimento',
},
];

const productsGetAll = () => {
  const responseModel = dataModel;
  return { status: 200, data: responseModel };
};
const responseService = productsGetAll();

if (JSON.stringify(data) === JSON.stringify(responseService.data)) {
  console.log('somos iguais');
} else {
  console.log('Não somos iguais');
}