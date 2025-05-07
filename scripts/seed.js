const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criar cidades
  const city1 = await prisma.city.create({
    data: {
      name: 'Porto Seguro',
      difficulty: 2,
      description: 'Cidade costeira tranquila com poucos casos criminais, ideal para investigadores iniciantes.',
    },
  });
  
  console.log('Cidade criada:', city1.id);
  
  const city2 = await prisma.city.create({
    data: {
      name: 'Metrópolis',
      difficulty: 4,
      description: 'Grande centro urbano com alta taxa de criminalidade e casos complexos que exigem experiência.',
    },
  });
  
  console.log('Cidade criada:', city2.id);

  // Criar um caso de exemplo
  const case1 = await prisma.case.create({
    data: {
      title: 'Desaparecimento em Alto Mar',
      summary: 'Investigação sobre o misterioso desaparecimento de um passageiro em um cruzeiro.',
      context: 'Um passageiro do cruzeiro Oceanic Dream desapareceu misteriosamente durante uma viagem pelo Caribe. Não há sinais de que tenha caído ao mar e as câmeras de segurança não registraram sua saída da cabine.',
      status: 'ativo',
      cityId: city1.id, // Associar à cidade de Porto Seguro (dificuldade 2)
    },
  });
  
  console.log('Caso criado:', case1.id);

  // Criar uma pessoa relacionada ao caso
  const person1 = await prisma.person.create({
    data: {
      caseId: case1.id,
      name: 'Carlos Mendes',
      role: 'desaparecido',
      description: 'Homem de 45 anos, turista brasileiro que desapareceu do navio na terceira noite de viagem.',
      image: 'https://i.pravatar.cc/150?img=68',
    },
  });

  console.log('Pessoa criada:', person1.id);

  // Definir data e hora atual
  const now = new Date();
  
  // Data e hora de hoje às 10:00
  const todayAt10 = new Date();
  todayAt10.setHours(10, 0, 0, 0);
  
  // Criar um arquivo relacionado ao caso com data atual (disponível)
  const file1 = await prisma.file.create({
    data: {
      caseId: case1.id,
      type: 'relato',
      title: 'Testemunho da esposa',
      description: 'Relato da esposa sobre as últimas horas antes do desaparecimento',
      content: 'A esposa afirma que jantaram juntos e depois foram ao cassino. Ela se retirou às 23h, enquanto ele decidiu continuar jogando. As câmeras mostram ele saindo do cassino à 1h20, mas não há registro dele chegando ao quarto.',
      availableAt: todayAt10, // Disponível a partir das 10:00 de hoje
    },
  });

  console.log('Arquivo disponível criado:', file1.id);

  // Criar um arquivo com data futura (restrito) - 7 dias no futuro às 18:00
  const futureDate1 = new Date();
  futureDate1.setDate(futureDate1.getDate() + 7);
  futureDate1.setHours(18, 0, 0, 0);
  
  const file2 = await prisma.file.create({
    data: {
      caseId: case1.id,
      type: 'documento',
      title: 'Relatório Preliminar da Investigação',
      description: 'Análise inicial das evidências coletadas pelos investigadores',
      content: 'Este relatório preliminar contém informações confidenciais sobre a investigação e possíveis cenários para o desaparecimento. Inclui análise das câmeras de segurança e testemunhos coletados.',
      availableAt: futureDate1,
    },
  });

  console.log('Arquivo restrito criado:', file2.id, 'disponível em:', futureDate1.toLocaleString('pt-BR'));

  // Criar outro arquivo disponível
  const file3 = await prisma.file.create({
    data: {
      caseId: case1.id,
      type: 'imagem',
      title: 'Última foto conhecida',
      description: 'Foto tirada do circuito interno do cassino, mostrando a vítima saindo',
      content: 'https://images.unsplash.com/photo-1517396429209-88be68699947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      availableAt: now, // Disponível imediatamente
    },
  });

  console.log('Arquivo de imagem criado:', file3.id);

  // Criar arquivo restrito para liberação em algumas horas
  const todayLater = new Date();
  todayLater.setHours(todayLater.getHours() + 3); // Disponível em 3 horas
  
  const file4 = await prisma.file.create({
    data: {
      caseId: case1.id,
      type: 'entrevista',
      title: 'Entrevista com tripulantes',
      description: 'Depoimentos coletados de membros da tripulação que estavam de serviço na noite do desaparecimento',
      content: 'Foram entrevistados 5 membros da tripulação que estavam de serviço: o bartender do cassino, dois seguranças, o camareiro responsável pelo deck e o oficial de navegação. Nenhum deles relatou ter visto a vítima após sua saída do cassino.',
      availableAt: todayLater,
    },
  });

  console.log('Arquivo restrito criado:', file4.id, 'disponível em:', todayLater.toLocaleString('pt-BR'));

  // Criar uma segunda pessoa relacionada ao caso
  const person2 = await prisma.person.create({
    data: {
      caseId: case1.id,
      name: 'Maria Mendes',
      role: 'testemunha',
      description: 'Esposa da vítima, 42 anos. Estava no cruzeiro e foi a última pessoa conhecida a ver Carlos antes do desaparecimento.',
      image: 'https://i.pravatar.cc/150?img=47',
    },
  });

  console.log('Pessoa criada:', person2.id);

  // Criar um segundo caso
  const case2 = await prisma.case.create({
    data: {
      title: 'Roubo na Galeria de Arte',
      summary: 'Investigação sobre o roubo de uma valiosa obra de arte em plena luz do dia.',
      context: 'Uma pintura avaliada em 2 milhões de dólares foi roubada da Galeria Nacional durante o horário de visitação. As câmeras de segurança foram desligadas momentos antes e os guardas não notaram nada suspeito.',
      status: 'ativo',
      cityId: city2.id, // Associar à cidade de Metrópolis (dificuldade 4)
    },
  });

  console.log('Caso criado:', case2.id);

  // Arquivo disponível para o segundo caso
  const file5 = await prisma.file.create({
    data: {
      caseId: case2.id,
      type: 'documento',
      title: 'Lista de funcionários presentes',
      description: 'Relação de todos os funcionários que estavam de plantão no dia do roubo',
      content: 'João Silva - Segurança, entrada principal\nMaria Oliveira - Recepção\nCarlos Eduardo - Segurança, ala leste\nAna Beatriz - Curadora, presente na sala do roubo\nRicardo Gomes - Segurança, ala oeste\nPatrícia Santos - Guia turística\nFernando Mello - Gerente de operações',
      availableAt: now,
    },
  });

  console.log('Arquivo criado:', file5.id);

  // Arquivo restrito para o segundo caso - 3 dias no futuro às 14:30
  const futureDate2 = new Date();
  futureDate2.setDate(futureDate2.getDate() + 3);
  futureDate2.setHours(14, 30, 0, 0);
  
  const file6 = await prisma.file.create({
    data: {
      caseId: case2.id,
      type: 'entrevista',
      title: 'Entrevista com suspeito principal',
      description: 'Transcrição da entrevista realizada com o principal suspeito do roubo',
      content: 'Este documento contém a transcrição completa da entrevista com o principal suspeito, incluindo contradições em seu álibi e possíveis motivos para o crime.',
      availableAt: futureDate2,
    },
  });

  console.log('Arquivo restrito criado:', file6.id, 'disponível em:', futureDate2.toLocaleString('pt-BR'));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 