# Electronica Back SV

### Cuales son los topics de mqtt a los cual la maquina se suscribe

* delete/product

    ```
  productId
    ```
* product/add

    ```json
    {
    "id": number,
    "name": String,
    "price" : number
    }
   ```
* product/adjustPrice

    ```
    newPrice
    ```
* machine/delete/${machineId}

    ```
  delete
  ```
* machine/refill/${machineId}


### Cuales son los topics de mqtt a los cual la maquina publica

* _sold/products_

    ```json
    message = {
      "machine": <Machine>,
      "productId": number
    }
    ```
* _machine/broke_

    ```json
    message = {
      "machineId": number
    }
    ```
* _machine/working_

    ```json
    message = {
      "machineId": number
    }
    ```
* _machine/ready_
    
    ```json
    message = {
      "machineId": number
    }
    ```
* _machine/connected_

    ```json
    message = {
      "machineId": number
    }
    ```