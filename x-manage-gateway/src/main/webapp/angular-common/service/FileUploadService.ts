import { Injectable, OnInit } from '@angular/core';
import { MsgService } from './MsgService';
import { HttpService } from './HttpService';
//  import { GLOBAL } from '../../data/DICT';
import { UpLoadFile } from '../entity/UploadFile';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators/filter';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * 文件上传服务
 */
@Injectable()
export class FileUploadService {
  imagesList: Array<any>;
  imgUrl: any;
  constructor(private sanitizer: DomSanitizer,
    private httpClient: HttpClient,
    public httpService: HttpService,
    public msgService: MsgService) {
    console.log('/************************init FileUploadService************************/');
    this.imagesList = [
      {
        imgUrl: 'partnerAgreementUrl',
      }
    ];
  }
  public upLoad(upLoadUrl: string, upLoadFile: UpLoadFile) {
    let reqData = {
      data: ''
    };
    reqData.data = JSON.stringify({
      id: upLoadFile.id
    });
    let url = upLoadUrl + '?reqData=' + encodeURI(JSON.stringify(reqData))
    console.log('上传的路径为：', url);
    // url = upLoadUrl   + '?reqData=dajidali'; // + JSON.stringify(reqData) + '';
    // this.httpService.postFormData(url, {file: upLoadFile.file, reqData: reqData}).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   response => {
    //     console.log(response);
    //   });
    let formData = new FormData();
    // formData.append('files[]', upLoadFile.file);
    formData.append('file', upLoadFile.file);
    // formData.append('reqData', JSON.stringify(reqData));
    //   + upLoadFile.attachmentTypeID + '\",\"id\":\"' + upLoadFile.id + '\",\"ifAudit\":\"'
    //   + upLoadFile.ifAudit + '\",\"orgID\":\"' + upLoadFile.orgID + '\",\"orgType\":\"' + upLoadFile.orgType + '\",\"processId\":\"' + upLoadFile.processId + '\"}\"}'); //  JSON.stringify(reqData)
    // formData.append('reqData', JSON.stringify(reqData));
    // formData.append('attachmentTypeID', upLoadFile.attachmentTypeID);
    // formData.append('id', upLoadFile.id);
    // formData.append('ifAudit', upLoadFile.ifAudit);
    // formData.append('orgID', upLoadFile.orgID);
    // formData.append('orgType', upLoadFile.orgType);
    // You can use any AJAX library you like
    // let httpHeaders: HttpHeaders = new HttpHeaders({
    //   'Content-Type': 'multipart/form-data;charset=UTF-8' //  application/octet-stream
    // });
    // {file: upLoadFile.file, reqData: reqData},
    const req = new HttpRequest('POST', url, formData, {
      // headers: httpHeaders,
      // reportProgress: true
    });
    this.httpClient.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: any) => {
      console.log('upload successfully.');
    }, (err) => {
      console.log('upload failed.');
      if (upLoadFile.file) {
        this.msgService.pop({ type: 'error', body: upLoadFile.file.name + '上传失败' });
      } else {
        this.msgService.pop({ type: 'error', body: '找不到文件，上传失败' });
      }
    });
  }
  /**
   * 校验图片
   * @param imagesList 
   */
  public limitImg(imagesList: Array<any> ): boolean {
    imagesList = imagesList || [];

    for (let i = 0; i < imagesList.length; i++) {
      // if (name === imagesList[i].name) {

        let file = imagesList[i].file;

        if (!file && !imagesList[i].imgUrl) {
          this.msgService.pop({ type: 'error', body: '请选择图片' })
          return true;
        }

        if (imagesList[i].file) {
          //  判断是不是gif
          let isImg = file.type.split('/')[0] === 'image' && file.type.split('/')[1] !== 'gif'
          //  判断是否大于10M
          let isFit = file.size <= 1024 * 1024 * 10;
          if (!isImg) {
            this.msgService.pop({ type: 'error', body: '必须选择png/jpg格式图片' })
            return true;
          }
          if (!isFit) {
            this.msgService.pop({ type: 'error', body: '图片超过10M，请重新选择图片' });
            return true;
          }
        }
      // }
      // if (isImg && isFit) {
      //   const imgUrl = window.URL.createObjectURL(file);
      //   const sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
      //   this.imgUrl = sanitizerUrl;
      //   for (let i = 0; i < this.imagesList.length; i++) {
      //     this.imagesList[i].imgUrl = sanitizerUrl;
      //     this.imagesList[i].file = file ;
      //   }
      // }

    }
    return false
  }

}
