const loadPhones = (searchText, dataLimit) => {
  const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(URL);
  
    fetch(URL)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data, dataLimit))
    .catch(error => console.log(error))

  };
  const displayPhones =(phones, dataLimit) =>{
    // console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ' ';

    // display 20 phones only
    const showAll =document.getElementById('show-all');
    if(dataLimit && phones.length>10){
        phones = phones.slice(0,4);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');

    }
    

    // display no phones found
    const noPhone = document.getElementById('no-msg-found');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }else{
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone => {
        // destructing
        const { image, phone_name, slug } = phone;

        const phoneDiv =document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
            <div class="card">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title: ${phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                    </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader / spinner
    toggleSpinner(false);
  }
  const processSearch=(dataLimit)=>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field') 
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
  }
// handle search button click
  document.getElementById('btn-search').addEventListener('click',function(){
    // start loader
    processSearch(10);
    });
    // search input field enter key handler
  document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        // code for enter
        processSearch(10);
    }
    });

    const toggleSpinner = isLoading =>{
        const loaderSection = document.getElementById('loader');
        if(isLoading){
            loaderSection.classList.remove('d-none');
        }else{
            loaderSection.classList.add('d-none');
        }
    }

document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
    });
    loadPhoneDetails = slugId =>{
        const url = `https://openapi.programming-hero.com/api/phone/${slugId}`;
        fetch(url)
        .then((res) => res.json())
        .then((data) => displayPhonesDeatails(data.data))
    }
const displayPhonesDeatails = phone=>{
    console.log(phone);
    const modalTitle =document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneBodyDetails =document.getElementById('phone-body-details');
    phoneBodyDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Realease Date Found' }</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information Found' }</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information Found' }</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0]+", "+ phone.mainFeatures.sensors[1]+", "+ phone.mainFeatures.sensors[2]: 'No Sensor Information Found' }</p>
    `;
}
  loadPhones('apple');