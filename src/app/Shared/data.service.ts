import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  searchResult: { category: string; title: string }[] = [];
  dataResult = {};

  searchResults() {
    this.searchResult = [
      { category: 'NCD Full Suite', title: 'RITM1070982' },
      { category: 'NCD Full Suite', title: 'RITM1070123' },
      { category: 'NCD Full Suite', title: 'RITM1080154' },
    ];
    return this.searchResult;
  }



  dataResults(RITM: string) {
    console.log("RITM Passed down",RITM)
    this.dataResult = {
      name: 'Provision Process Started',
      progress: false,
      details: 'RITM02222734 Opened for you',
      state: "active",
      cmd: '',
      children: [
        {
          name: 'Repository Creation Process',
          progress: true,
          state: 'completed',
          details: "Yum, Nuget and Npm repo's will be created.",
          cmd: 'Yum Repo created here : http://redlinux/repo/nomura.created',
          children: [
            {
              name: 'Yum Repository Created Successfully',
              progress: true,
              state: 'completed',
              details: "Yum, Repo Creation Complete",
              cmd: 'Yum Repo created here : http://redlinux/repo/nomura.created',
            },
            {
              name: 'Nuget Repository Created Successfully',
              progress: true,
              details: "Yum, Nuget and Npm repo's will be created.",
              cmd: 'Yum Repo created here : http://redlinux/repo/nomura.created',
              state: 'completed',
              value: 300,
              children: [
                {
                  name: 'Nuget Repository Creation failed',
                  progress: true,
                  details: " Nuget repo creation failed",
                  cmd: 'Nuget Repo creation failed Error:/n Error in Demo.py file.',
                  state: 'failed',
                  value: 300,

                },
                {
                  name: 'Nuget Repository Created Successfully',
                  progress: true,
                  details: " Nuget repo creation failed",
                  cmd: 'Nuget Repo Creation Complete.',
                  state: 'completed',
                  value: 300,

                },
              ],
            },

          ],
        },
        {
          name: 'Jenkins Build Folder Creation',
          progress: true,
          details: "Jenkins Folder created successfully.",
          cmd: 'Jenkins Folder created SDLCAUTOMATION',
          state: 'completed',
          value: 300,
        },
        {
          name: 'Jenkins Deploy Non Prod Folder Creation',
          progress: true,
          details: "Jenkins Folder created successfully.",
          cmd: 'Jenkins Folder created SDLCAUTOMATION',
          state: 'completed',
          value: 300,
        },
        {
          name: 'Jenkins Deploy Prod Folder Creation',
          progress: true,
          details: "Jenkins Folder created successfully.",
          cmd: 'Jenkins Folder created SDLCAUTOMATION',
          state: 'completed',
          value: 300,
        },
        {
          name: 'Jenkins Job Creation',
          progress: true,
          details: "Jenkins Job created successfully.",
          cmd: 'Jenkins Job created under SDLCAUTOMATION',
          state: 'completed',
          value: 300,
        },
        {
          name: 'Gitlab Project Created',
          progress: true,
          details: "Gitlab Project Creation Successful",
          cmd: 'Gitlab Project Created at: http://redlinux/repo/nomura.created',
          state: 'completed',
          value: 300,
        },
        {
          name: ' Sonarqube git Integration Complete ',
          progress: false,
          details: "Sonarqube integration Complete",
          cmd: 'Sonarqube repo link : http://redlinux/repo/nomura.created',
          state: 'active',
          value: 300,
          children:[
            {
              name: ' Sonarqube git Integration Complete ',
              progress: true,
              details: "Sonarqube integration Complete",
              cmd: 'Sonarqube repo link : http://redlinux/repo/nomura.created',
              state: 'failed',
              value: 300,
            },{
              name: ' Sonarqube git Integration Complete ',
              progress: false,
              details: "Sonarqube integration Complete",
              cmd: 'Sonarqube repo link : http://redlinux/repo/nomura.created',
              state: 'active',
              value: 300,
            },
          ]
        },
      ],
    };
    let sleep = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
      };

    return sleep(2000).then(()=>{
      return this.dataResult;
    });

  }
}
