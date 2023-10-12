export const UPLOAD_USING_CODE_STUBS = [
  {
    title: "Curl",
    urlSnippets: `curl -X POST "http://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/url/filters?filters={selectedFilters}&mediaUrl=&apikey={api_secret}`,
    fileSnippets: `curl -X POST "http://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/filters?filters={selectedFilters}&apikey={api_secret}" / -F "file=@path"`,
  },
  {
    title: "Python",
    urlSnippets: `import requests

url = 'http://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/url/filters'

params = {
  'filters': '{selectedFilters}',
  'apikey': '{api_secret}',
  'mediaUrl': '{MEDIA_URL}',
}

response = requests.post(url, params=params)
print(response.text)`,
    fileSnippets: `import requests

url = 'http://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/filters'

params = {
  'filters': '{selectedFilters}',
  'apikey': '{api_secret}'
}
files = {'file': open('', 'rb')}
response = requests.post(url, files=files, params=params)

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
    String baseUrl = "http://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/url/filters";

    UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(baseUrl)
      .queryParam("filters", '{selectedFilters}')
      .queryParam("apikey", '{api_secret}');
      .queryParam("mediaUrl", '{MEDIA_URL}')

    URI uri = uriBuilder.build().toUri();

    result = restTemplate.postForEntity(uri,null,String.class);
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

        String apiUrl = "http://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/filters";
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("filters", '{selectedFilters}')
                .queryParam("apikey", '{api_secret}');
        URI uri = uriBuilder.build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        File fileToUpload = new File("");
        body.add("file", new FileSystemResource(fileToUpload));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        result = restTemplate.postForEntity(uri,requestEntity,String.class);
    }
}`,
  },
  {
    title: "PHP",
    urlSnippets: ` Comming soon `,
    fileSnippets: ` Comming soon `,
  },
  {
    title: "Javascript",
    urlSnippets: `const axios = require('axios');

const url = 'http://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/url/filters';

const params = {
  mediaUrl: '{MEDIA_URL}',
  filters: '{selectedFilters}',
  apikey: '{api_secret}'
};

// Make the POST request
axios.post(url, null, { params })
  .then(response => {
    // Handle the response data here
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors here
    console.error('Error:', error);
  });`,
    fileSnippets: `const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const url = 'http://mediafirewall-ai.themillionvisions.com/mfw/media/{userEmail}/filters';

data = new FormData();
data.append('file', fs.createReadStream(''));

const params = {
  filters: '{selectedFilters}',
  apikey: '{api_secret}'
};

axios.post(url, data, { params }, {
  headers: data.getHeaders(),
}).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  if (error.response) console.log(error.response.data);
  else console.log(error.message);
});`,
  },
];