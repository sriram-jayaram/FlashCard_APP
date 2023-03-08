import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../../services/flashcard.service';
import { Flashcard } from '../../models/flashcard.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  flashcard : Flashcard;
  count : any;
  nlino:any;
  x:any;
  kanchng :any;
  furchng :any;
  menchng :any ;
  constructor(private flashcardservice : FlashcardService,
    private router:Router,
    private route :ActivatedRoute,
    private _snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
    
    this.flashcard = new Flashcard;
    this.flashcardservice.fetchbyline("1").subscribe(data =>{
      // console.log(data);
      this.flashcard.lineno = data.data.lineno;
      this.flashcard.kanji =  data.data.kanji;
      this.flashcard.Read_Method = data.data.Read_Method;
      this.flashcard.Meaning = data.data.Meaning;
    })

    this.flashcardservice.fetchcount().subscribe(data =>{
      this.count = data.data;

    })

  }

  next(){
    console.log(this.count);
    if(this.flashcard.lineno == this.count){
      this.flashcardservice.fetchbyline("1").subscribe(data =>{
        console.log(data);
        this.flashcard.lineno = data.data.lineno;
        this.flashcard.kanji =  data.data.kanji;
        if(this.furchng == false){
          this.flashcard.Read_Method = "";
        }else{
          this.flashcard.Read_Method = data.data.Read_Method;
        }
        if(this.menchng == false){
          this.flashcard.Meaning = "";
        }else{
          this.flashcard.Meaning = data.data.Meaning;
        }
        
      })
    }else{
      this.nlino = Number(this.flashcard.lineno) + 1;
      this.flashcardservice.fetchbyline(this.nlino).subscribe(data =>{
        console.log(data);
        this.flashcard.lineno = data.data.lineno;
        this.flashcard.kanji =  data.data.kanji;
        if(this.furchng == false){
          this.flashcard.Read_Method = "";
        }else{
          this.flashcard.Read_Method = data.data.Read_Method;
        }
        if(this.menchng == false){
          this.flashcard.Meaning = "";
        }else{
          this.flashcard.Meaning = data.data.Meaning;
        }
      })
    }

  }

  random(){
     this.x = Math.floor((Math.random() * this.count) + 1)
    // console.log(x);
    this.flashcardservice.fetchbyline(this.x).subscribe(data =>{
      console.log(data);
      this.flashcard.lineno = data.data.lineno;
      this.flashcard.kanji =  data.data.kanji;
      if(this.furchng == false){
        this.flashcard.Read_Method = "";
      }else{
        this.flashcard.Read_Method = data.data.Read_Method;
      }
      if(this.menchng == false){
        this.flashcard.Meaning = "";
      }else{
        this.flashcard.Meaning = data.data.Meaning;
      }
      
    })
  }

  kancha(event:MatSlideToggleChange){
    this.kanchng = event.checked;
     if(event.checked == false){
      this.flashcard.kanji = "";
     }else{
      
      this.flashcardservice.fetchbyline(this.flashcard.lineno).subscribe(data =>{
        console.log(data);
        // this.flashcard.lineno = data.data.lineno;
        this.flashcard.kanji =  data.data.kanji;
        // this.flashcard.Read_Method = data.data.Read_Method;
        // this.flashcard.Meaning = data.data.Meaning;
      })
     }
  }

  furcha(event:MatSlideToggleChange){
    this.furchng = event.checked;
    if(event.checked == false){
      this.flashcard.Read_Method = "";
     }else{
      this.flashcardservice.fetchbyline(this.flashcard.lineno).subscribe(data =>{
        console.log(data);
        // this.flashcard.lineno = data.data.lineno;
        // this.flashcard.kanji =  data.data.kanji;
        this.flashcard.Read_Method = data.data.Read_Method;
        // this.flashcard.Meaning = data.data.Meaning;
      })
     }
 }

 mencha(event:MatSlideToggleChange){
  this.menchng = event.checked;
  if(event.checked == false){
    this.flashcard.Meaning = "";
   }else{
    this.flashcardservice.fetchbyline(this.flashcard.lineno).subscribe(data =>{
      console.log(data);
      // this.flashcard.lineno = data.data.lineno;
      // this.flashcard.kanji =  data.data.kanji;
      // this.flashcard.Read_Method = data.data.Read_Method;
      this.flashcard.Meaning = data.data.Meaning;
    })
   }
}

}
