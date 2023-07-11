# Projeto

Ao longo do curso vamos desenvolver uma variação do UBER, onde um motorista pode se cadastrar para fazer corridas para passageiros.

## Próxima etapa:

Devem ser desenvolvidos os seguintes use cases:

* Cadastrar passageiro
url: /passengers
method: POST
input: name, email e document
output: passenger_id (uuid)


* Cadastrar motorista
url: /drivers
method: POST
input: name, email, document e car plate
output: driver_id (uuid)

Considerações:

1 - O documento, do tipo cpf, deve ser validado utilizando o algoritmo fornecido, que deve ser refatorado. O código-fonte está disponível em https://github.com/rodrigobranas/cccat12_1/blob/master/backend/ride/src/cpf.ts

2 - Crie uma API para receber as requisições

3 - Utilize um banco de dados de sua preferência para persistir os dados

===============================================================================================

# Devem ser desenvolvidos os seguintes use cases:

* Calcular corrida (modificar) OK
url: /calculate_ride
method: POST
input: trocar a distance pelas coordenadas de from (lat, long) e to (lat, long)
output: price (estimado)


* Solicitar corrida OK
url: /request_ride
method: POST
input: passenger_id, from (lat, long), to (lat, long)
output: ride_id

Ao solicitar a corrida o status dela deve ser waiting_driver e o driver_id null. Além disso, deve ser criado o campo request_date com a data atual.

O from e to servem apenas para definir os pontos de origem e destino e orientar o motorista em relação ao trajeto desejado, conforme a corrida estiver em andamento os segmentos serão adicionados e o preço final pode mudar caso o motorista pegue um caminho diferente, faça mudanças no trajeto ou mude de horário, por exemplo uma corrida iniciada às 22:30 que termina às 23:10 acaba tendo cobranças diferentes por trecho.

* Aceitar corrida
url: /accept_ride
method: POST
input: ride_id, driver_id
output: void

Ao aceitar a corrida, o status dela deve ser accepted e o driver_id definido. Além disso, a accept_date deve ser a data atual.

* Consultar corrida
url: /rides/:id
method: GET
input: ride_id
output: passenger's information, driver's information, status, waiting_duration