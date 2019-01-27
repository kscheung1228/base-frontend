export class S3File {
    id: number;
    itemfile: string;
    itemname: string;
  }


export class S3Filepolicy {
    id:number
    name: string;
    raw_filename: string;
    filetype: string;
    // post_data: string;
    // data: string;
    // url:string;
    // fields:string;
  }


  // key = 'cfe-tests/screen_shot.png'
  // policy_url = f'http://127.0.0.1:8000/upload/policy/'
  // post_data = None
  // data={'name':'screen_shot.png','raw_filename':'screen_shot.png','filetype':'images/png'}
  // r = requests.post(policy_url, json=data)
  // if r.status_code in range(200, 299):
  //     # print(r.json())
  //     post_data = r.json()
  //     print(post_data)
  // print('policy', r.status_code)
  
  
  
  