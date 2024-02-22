import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { AdminService } from '../services/admin.service';
import { SubjectServiceService } from '../services/subject-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  @ViewChild('barChartCanvas1') barChartCanvas1: ElementRef;
  @ViewChild('barChartCanvas2') barChartCanvas2: ElementRef;
  @ViewChild('barChartCanvas3') barChartCanvas3: ElementRef;
  @ViewChild('barChartCanvas4') barChartCanvas4: ElementRef;
  @ViewChild('barChartCanvas5') barChartCanvas5: ElementRef;
  @ViewChild('barChartCanvas6') barChartCanvas6: ElementRef;
  @ViewChild('barChartCanvas7') barChartCanvas7: ElementRef;
  @ViewChild('barChartCanvas8') barChartCanvas8: ElementRef;

  ages:string[] = ["primary (1-4)", "primary(5-8)", "highschool"];
  professorToAge:number[] = [];
  subjects:string[] = [];
  professorToSubject:number[] = [];
  genders: string[] = ["male", "female"];
  professorGender:number[] = [];
  studentGender: number[] = [];
  classesPerDayOfWeek:number[] = [];
  daysOfTheWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Firday", "Saturday"];
  tenBestProfs: string[] = [];
  classesPerMonth:number[][] = [];
  classesPerSubject:number[] = [];
  classesPerProf:number[] = [];
  constructor(private router:Router, private adminService:AdminService){}

  ngOnInit(): void {
    this.adminService.profesorToAge().subscribe(data=>{
      this.professorToAge = data;
      this.adminService.getSubjectNames().subscribe(data1=>{
        this.subjects = data1;
        this.adminService.profToSubject().subscribe(data2=>{
          this.professorToSubject = data2;
          this.adminService.getProfGender().subscribe(data3=>{
            this.professorGender = data3;
            this.adminService.getStudGender().subscribe(data4=>{
              this.studentGender = data4;
              this.adminService.classesPerDayOfWeek().subscribe(data5=>{
                this.classesPerDayOfWeek = data5;
                this.adminService.tenBestProfs().subscribe(data6=>{
                  this.tenBestProfs = data6;
                  this.tenBestProfs.forEach(name => {
                    this.adminService.classesPerMonth(name.split(" ")[0]).subscribe(data7=>{
                      this.classesPerMonth.push(data7);
                      if(this.tenBestProfs.indexOf(name)==this.tenBestProfs.length-1) {
                        this.adminService.classesPerSubject().subscribe(data8=>{
                          this.classesPerSubject = data8;
                          this.adminService.classesPerProf().subscribe(data9=>{
                            this.classesPerProf = data9;
                            this.initializeCharts();
                          })
                        })
                      }
                    })
                  });
                })
              })
            })
          })
        })
      })
    })
  }

  private initializeCharts() {

    const ctx = this.barChartCanvas1.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.ages,
        datasets: [{
          label: 'Profesors to ages',
          data: this.professorToAge,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Profesors per age group'
          }
        }
      }
    });
    const ctx1 = this.barChartCanvas2.nativeElement.getContext('2d');
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: this.subjects,
        datasets: [{
          label: 'Profesors to subjects',
          data: this.professorToSubject,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Profesors per subjects'
          }
        }
      }
    });
    const ctx2 = this.barChartCanvas3.nativeElement.getContext('2d');
    new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: this.genders,
        datasets: [{
          label: 'Profesors gender ratio',
          data: this.professorGender,
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(139,69,19, 0.2)'],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Professors gender ratio'
          }
        }
      }
    });
    const ctx3 = this.barChartCanvas4.nativeElement.getContext('2d');
    new Chart(ctx3, {
      type: 'pie',
      data: {
        labels: this.genders,
        datasets: [{
          label: 'Students gender ratio',
          data: this.studentGender,
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(139,69,19, 0.2)'],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Students gender ratio'
          }
        }
      }
    });
    const ctx4 = this.barChartCanvas5.nativeElement.getContext('2d');
    new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: this.daysOfTheWeek,
        datasets: [{
          label: 'Average class number per day in 2023',
          data: this.classesPerDayOfWeek,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Average class number per day of the week in 2023'
          }
        }
      }
    });
    const dataset = [];
    for(let i=0; i<this.tenBestProfs.length; i++){
      dataset.push({label:this.tenBestProfs[i], data:this.classesPerMonth[i]});
    }
    const ctx5 = this.barChartCanvas6.nativeElement.getContext('2d');
    new Chart(ctx5, {
      type: 'line',
      data: {

        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: dataset
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of classes per professors in each month of 2023'
          }
        }
      }
    });
    
    const ctx6 = this.barChartCanvas7.nativeElement.getContext('2d');
    new Chart(ctx6, {
      type: 'bar',
      data: {
        labels: this.subjects,
        datasets: [{
          label: 'Number of classes per subject',
          data: this.classesPerSubject,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of classes per subject'
          }
        }
      }
    });

    const ctx7 = this.barChartCanvas8.nativeElement.getContext('2d');
    new Chart(ctx7, {
      type: 'doughnut',
      data: {
        labels: this.tenBestProfs,
        datasets: [{
          label: 'Number of classes per professor',
          data: this.classesPerProf,
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(225,196,255, 0.2)', 'rgba(255,127,80,0.2)', 'rgba(219,112,147, 0.2)'],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of classes per professor'
          }
        }
      }
    });
  }

  logout(){
    localStorage.removeItem("admin");
    this.router.navigateByUrl("/");
  }
}
