export const UPLOAD_USING_CODE_STUBS = [
    {
        title: "Curl",
        urlSnippets: `curl -X POST "https://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/url/filters?filters={selectedFilters}&mediaUrl=&apikey={api_secret}" ^ -H "Authorization: Bearer {jwt_token}"`,
        fileSnippets: `curl -X POST "https://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/filters?filters={selectedFilters}&apikey={api_secret}" ^
    -H "Authorization: Bearer {jwt_token}" ^
    -F "file=@image.png"`,
    },
    {
        title: "Python",
        urlSnippets: `import requests

url = 'https://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/url/filters'

params = {
  'filters': '{selectedFilters}',
  'apikey': '{api_secret}',
  'mediaUrl': '{MEDIA_URL}',
}

headers = {
  'Authorization': 'Bearer {jwt_token}',
}

response = requests.post(url, params=params, headers = headers)
print(response.text)`,
        fileSnippets: `import requests

url = 'https://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/filters'

params = {
  'filters': '{selectedFilters}',
  'apikey': '{api_secret}'
}

headers = {
  'Authorization': 'Bearer {jwt_token}',
}

files = {'file': open('', 'rb')}
response = requests.post(url, files=files, params=params, headers = headers)

print(response.text)`,
    },
    {
        title: "Java",
        urlSnippets: `import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.*;

public class UrlRequest {    
  public static void main(String[] args) {
    ResponseEntity<String> result = null;
    RestTemplate restTemplate = new RestTemplate();
    String baseUrl = "https://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/url/filters";

    UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(baseUrl)
      .queryParam("filters", '{selectedFilters}')
      .queryParam("apikey", '{api_secret}');
      .queryParam("mediaUrl", '{MEDIA_URL}')

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer {jwt_token}"); 
    HttpEntity<?> requestEntity = new HttpEntity<>(headers);
    
    URI uri = uriBuilder.build().toUri();

    result = restTemplate.postForEntity(uri,null,String.class);
    System.out.println(result.getBody());
  }
}`,
        fileSnippets: `import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.File;
import java.net.URI;

public class UploadRequest {
    public static void main(String[] args) {
        ResponseEntity<String> result = null;
        RestTemplate restTemplate = new RestTemplate();

        String apiUrl = "https://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/filters";
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("filters", '{selectedFilters}')
                .queryParam("apikey", '{api_secret}');
        URI uri = uriBuilder.build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("Authorization", "Bearer {jwt_token}"); 

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        File fileToUpload = new File("");
        body.add("file", new FileSystemResource(fileToUpload));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        result = restTemplate.postForEntity(uri,requestEntity,String.class);
    }
}`,
    },
    //     {
    //         title: "PHP",
    //         urlSnippets: ` <?php

    // $baseUrl = 'http://mediafirewall-ai.themillionvisions.com/mfw/media/sams@trek.com/url/filters';
    // $filters = 'Type(HighDefinition)';
    // $mediaUrl = 'https://media-firewall.s3.ap-south-1.amazonaws.com/Input/MEDIA/%2FVIDEO/ze.mp4';
    // $apikey = 'vMoIhSZbp9ucWNEHSwyjV1qnU2iaIxYN';

    // // Build the URL with query parameters
    // $uri = $baseUrl . '?filters=' . urlencode($filters) . '&mediaUrl=' . urlencode($mediaUrl) . '&apikey=' . $apikey;

    // // Initialize cURL session
    // $ch = curl_init($uri);

    // // Set cURL options
    // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($ch, CURLOPT_POST, true);

    // // Execute the cURL request
    // $response = curl_exec($ch);

    // // Check for cURL errors
    // if (curl_errno($ch)) {
    //     echo 'Curl error: ' . curl_error($ch);
    // }

    // // Close cURL session
    // curl_close($ch);

    // // Output the response
    // echo $response;
    // ?> `,
    //         fileSnippets: ` <?php

    // $apiUrl = 'http://mediafirewall-ai.themillionvisions.com/mfw/media/sams@trek.com/filters';
    // $filters = 'Type(HighDefinition)';
    // $apikey = 'vMoIhSZbp9ucWNEHSwyjV1qnU2iaIxYN';

    // // Build the URL with query parameters
    // $uri = $apiUrl . '?filters=' . urlencode($filters) . '&apikey=' . $apikey;

    // // Initialize cURL session
    // $ch = curl_init($uri);

    // // Set cURL options
    // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($ch, CURLOPT_POST, true);

    // // Create a file upload array
    // $fileToUpload = new CURLFile('Dark.jpg', 'image/jpeg', 'file');
    // $postData = array(
    //     'file' => $fileToUpload,
    // );

    // // Set the POST fields
    // curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

    // // Execute the cURL request
    // $response = curl_exec($ch);

    // // Check for cURL errors
    // if (curl_errno($ch)) {
    //     echo 'Curl error: ' . curl_error($ch);
    // }

    // // Close cURL session
    // curl_close($ch);

    // // Output the response
    // echo $response;
    // ?> `,
    //     },
    {
        title: "Javascript",
        urlSnippets: `const axios = require('axios');

const url = 'https://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/url/filters';

const params = {
  mediaUrl: '{MEDIA_URL}',
  filters: '{selectedFilters}',
  apikey: '{api_secret}'
};

// Make the POST request
axios.post(url, null, {
  params,
  headers: {
    'Authorization': 'Bearer {jwt_token}'
  }
 })
  .then(response => {
    // Handle the response data here
  })
  .catch(error => {
    // Handle any errors here
    console.error('Error:', error);
  });`,
        fileSnippets: `const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const url = 'https://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/filters';

data = new FormData();
data.append('file', fs.createReadStream(''));

const params = {
  filters: '{selectedFilters}',
  apikey: '{api_secret}'
};

axios.post(url, data, {
  params,
  headers: {
    'Authorization': 'Bearer {jwt_token}'
  }
})
  .then(function (response) {
  }).catch(function (error) {
    // handle error
  });`,
    },
];
