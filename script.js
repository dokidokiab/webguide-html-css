const github_profiles = {
  profile1: "gabriel-nunes-s",
  profile2: "joicepsilva",
  profile3: "dokidokiabr",
  profile4: "usuario4-github"
};

// Objeto para armazenar o cache
const cache = {};

// Função para obter informações do perfil do GitHub
function get_github_profile_info(profile) {
  const githubUsername = github_profiles[profile];
  if (!githubUsername) {
    console.error(`O perfil '${profile}' não foi encontrado.`);
    return;
  }

  const profileCard = document.querySelector(`.${profile}-card`);
  if (!profileCard) {
    console.error(`O perfil '${profile}' não foi encontrado no HTML.`);
    return;
  }

  const userImage = profileCard.querySelector(".user_image");
  const userName = profileCard.querySelector(".user_name");
  const userLink = profileCard.querySelector(".user_link");

  if (cache[githubUsername]) {
    // Se as informações estiverem no cache, retornar do cache
    console.log(`Dados obtidos do cache para o perfil '${profile}':`, cache[githubUsername]);
    userName.textContent = cache[githubUsername].name;
    userImage.src = cache[githubUsername].avatar_url;
    userLink.href = cache[githubUsername].html_url;
    userLink.textContent = `@${githubUsername}`;
  } else {
    // Se as informações não estiverem no cache, fazer uma nova solicitação à API do GitHub
    const url = `https://api.github.com/users/${githubUsername}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        userName.textContent = data.name;
        userImage.src = data.avatar_url;
        userLink.href = data.html_url;
        userLink.textContent = `@${githubUsername}`;

        // Armazenar as informações obtidas no cache
        cache[githubUsername] = data;
        console.log(`Dados obtidos da API do GitHub para o perfil '${profile}':`, data);
      });
  }
}

// Chamar a função para cada perfil
for (let profile in github_profiles) {
  get_github_profile_info(profile);
}
