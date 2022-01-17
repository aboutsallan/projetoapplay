var candidatos = []

var dadoslocal = localStorage.getItem("candidatos")

if (dadoslocal == null){
   candidatos = [
    { id: "1", cpf: "42604610876", nome: "Lucas Vieira Dias", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
    { id: "2", cpf: "42604610876", nome: "Nelson Santana", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
  ];
  localStorage.setItem("candidatos" , JSON.stringify(candidatos))
  
}
else 
{
  var recebidolocal = localStorage.getItem("candidatos")

  candidatos = JSON.parse(recebidolocal)
}



function abrirModal(candidato) {

    document.getElementById("id").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("email").value = "";
    document.getElementById("sexoMasculino").checked = true;
    document.getElementById("nascimento").value = '';
    document.getElementById("skillHtml").checked = false;
    document.getElementById("skillCss").checked = false;
    document.getElementById("skillJs").checked = false;
    

  if (candidato) {
    document.getElementById("id").value = candidato.id;
    document.getElementById("cpf").value = candidato.cpf;
    document.getElementById("nome").value = candidato.nome;
    document.getElementById("celular").value = candidato.celular;
    document.getElementById("email").value = candidato.email;
    if(candidato.sexo=='Masculino'){
      document.getElementById("sexoMasculino").checked = true;
    }else{
      document.getElementById("sexoFeminino").checked = true;
    }
    document.getElementById("nascimento").value = candidato.nascimento.split('/').reverse().join('-');
    document.getElementById("skillHtml").checked = candidato.skills.html;
    document.getElementById("skillCss").checked = candidato.skills.css;
    document.getElementById("skillJs").checked = candidato.skills.js;
  }

  $('#candidatoModal').modal('show');
}

function fecharModal() {
  $('#candidatoModal').modal('hide');
  $('body').removeClass('modal-open');
  $('body').removeAttr('style');
  $('.modal-backdrop').remove();

 
}

function salvar() {
  let erro = 0
  let id = document.getElementById("id").value;
  let cpf = document.getElementById("cpf").value;
  let nome = document.getElementById("nome").value;
  let celular = document.getElementById("celular").value;
  let email = document.getElementById("email").value;
  let nascimento = document.getElementById("nascimento").value.split('-').reverse().join('/');
  let sexo = document.getElementById("sexoMasculino").checked;
  let skillHtml = document.getElementById("skillHtml").checked;
  let skillCss = document.getElementById("skillCss").checked;
  let skillJs = document.getElementById("skillJs").checked;

  // Fazer validações aqui 

  const button =  document.getElementById('btn-salvar')

  button.addEventListener('click', (event) => {
    
    event.preventDefault()
    const cpf = document.getElementById('cpf')
    const nome = document.getElementById('nome')
    const celular = document.getElementById('celular')
    const email = document.getElementById('email')
    const nascimento = document.getElementById('nascimento')
    const skillHtml = document.getElementById('skillHtml')
    const skillCss = document.getElementById('skillCss')
    const skillJs = document.getElementById('skillJs')

    function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
      var d = new Date,
          ano_atual = d.getFullYear(),
          mes_atual = d.getMonth() + 1,
          dia_atual = d.getDate(),
  
          ano_aniversario = +ano_aniversario,
          mes_aniversario = +mes_aniversario,
          dia_aniversario = +dia_aniversario,
  
          quantos_anos = ano_atual - ano_aniversario;
  
          

      if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
          quantos_anos--;
          
      }
  
      return quantos_anos < 0 ? 0 : quantos_anos;
  }

    if (skillHtml.value === ''  )  {
      
     
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Selecione pelo menos uma habilidade!',})           

    }
    
    var verificacpf = validarCPF(cpf.value)

    
    if (cpf.value == '' || verificacpf == false ){
      cpf.classList.add("errorInput")

      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Digite corretamente o CPF!',})
         
        erro = erro + 1

        
    }
    else 
    {
      cpf.classList.remove("errorInput")
    }

    if (nome.value == ''){
      nome.classList.add("errorInput")
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Digite corretamente o Nome!',})

        erro = erro + 1

        
    }
    else 
    {
      nome.classList.remove("errorInput")
    }
     if (celular.value == '' && celular.value < 14){
      celular.classList.add("errorInput")
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Digite corretamente o Celular!',})

        erro = erro + 1

        console.log('errocelular', erro)
    }
    else 
    {
      celular.classList.remove("errorInput")
    }
     if (email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1 || (email.value.indexOf(".") - email.value.indexOf("@") ==1)){
      email.classList.add("errorInput")
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Digite corretamente o e-mail!',})

        erro = erro + 1

        console.log('erroemail', erro)
    }
    else 
    {
      email.classList.remove("errorInput")
    }

        ano_atual = new Date(nascimento.value).getFullYear();
        mes_atual = new Date(nascimento.value).getMonth() + 1;
        dia_atual = new Date(nascimento.value).getDate();

        let idadeatual = idade(ano_atual, mes_atual, dia_atual)
        
        if(idadeatual < 16){
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Idade deve ser maior que 16 anos',})

            nascimento = ''

            erro = erro + 1

            console.log('erronascimento', erro)
        } else 
        {
          nascimento.classList.remove("errorInput")
        }
    
        console.log('erro', erro)
        
    
    if(erro < 1 ){

      fecharModal();  
      listarCandidatos();

      erro = 0
    }
      
  }) 

  // Fazer validações aqui

  let candidato = {
    id: id!=''?id:new Date().getTime(),
    cpf: cpf,
    nome: nome,
    celular: celular,
    email: email,
    sexo: sexo?'Masculino':'Feminino',
    nascimento: nascimento,
    skills: {
      html: skillHtml,
      css: skillCss,
      js: skillJs
    }
  };

  if(id!=''){
    let checkCandidato = candidatos.find(e=>e.id == candidato.id);
    checkCandidato.cpf = candidato.cpf;
    checkCandidato.nome = candidato.nome;
    checkCandidato.celular = candidato.celular;
    checkCandidato.email = candidato.email;
    checkCandidato.sexo = candidato.sexo;
    checkCandidato.nascimento = candidato.nascimento;
    checkCandidato.skills = candidato.skills;
  }else{
    
    candidatos.push(candidato);

    localStorage.setItem("candidatos" , JSON.stringify(candidatos))

  }


 // fecharModal();
  //listarCandidatos();
}

function validarCPF(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

function deletar(id)
{
  console.log(candidatos)

  var existe = candidatos.findIndex(f => f.id == id)

  if(existe >= 0){
    candidatos.splice(existe , 1)
    localStorage.setItem("candidatos" , JSON.stringify(candidatos))

  }
}

function listarCandidatos() {
  let tabela = document.getElementById("table-body");
  tabela.innerHTML = '';

  for (let candidato of candidatos) {
    let linha = document.createElement("tr");

    let colunaCpf = document.createElement("td");
    let colunaNome = document.createElement("td");
    let colunaCelular = document.createElement("td");
    let colunaEmail = document.createElement("td");
    let colunaSexo = document.createElement("td");
    let colunaNascimento = document.createElement("td");
    let colunaSkills = document.createElement("td");
    let colunaEditar = document.createElement("td");
    let colunaRemover = document.createElement("td");

    // Funcionalidades botão editar
    let botaoEditar = document.createElement("button");
    botaoEditar.innerHTML ='<i class="bi bi-pencil-square"></i>';
    botaoEditar.classList.add("btn-info");
    botaoEditar.onclick = function () {
      console.log('editar');
      abrirModal(candidato);
    }
   

    // Funcionalidades botão remover
    let botaoRemover = document.createElement("button");
    botaoRemover.innerHTML = '<i class="bi bi-trash"></i>';
    botaoRemover.classList.add("btn-danger");    
    botaoRemover.onclick = function () {
      var id = candidato.id;
    deletar(id);
    
    
    listarCandidatos();
    console.log('Remover item');
    }


    let arrSkills = [];
    if(candidato.skills.html){
      arrSkills.push('HTML');
    }
    if(candidato.skills.css){
      arrSkills.push('CSS');
    }
    if(candidato.skills.js){
      arrSkills.push('JS');
    }

    colunaCpf.appendChild(document.createTextNode(candidato.cpf.substring(1,7) + "..."));
    colunaNome.appendChild(document.createTextNode(candidato.nome));
    colunaCelular.appendChild(document.createTextNode(candidato.celular.substring(1,7) + "..."));
    colunaEmail.appendChild(document.createTextNode(candidato.email.substring(1,10) + "..."));
    colunaSexo.appendChild(document.createTextNode(candidato.sexo));
    colunaNascimento.appendChild(document.createTextNode(candidato.nascimento));
    colunaSkills.appendChild(document.createTextNode(arrSkills.join(', ')));
    colunaEditar.appendChild(botaoEditar);
    colunaRemover.appendChild(botaoRemover);

    linha.appendChild(colunaCpf);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaCelular);
    linha.appendChild(colunaEmail);
    linha.appendChild(colunaSexo);
    linha.appendChild(colunaNascimento);
    linha.appendChild(colunaSkills);
    linha.appendChild(colunaEditar);
    linha.appendChild(colunaRemover);

    tabela.appendChild(linha);
  }
}

listarCandidatos();


//Trecho resposável pelo filtro da tabela
$(document).ready(function () {
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#candidatos tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
