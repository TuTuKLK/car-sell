import { OffersService } from './../../services/offers.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Offer } from 'src/app/interfaces/offer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {


  offerForm!:FormGroup;

  offers: Offer[] = [];

  subscription!: Subscription;

  constructor(
    private formBuilder:FormBuilder,
    private offersService: OffersService
  ) {}

  ngOnInit(): void {
    this.initOfferForm();
    this.subscription = this.offersService.offersSubject.subscribe({
      next: (offers: Offer[]) => {
        console.log('NEXT');
        this.offers = offers
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.offersService.getOffers();
  }

  initOfferForm(): void {
    this.offerForm = this.formBuilder.group({
      id: [null],
      title: ['',[Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      brand: '',
      model: '',
      description: '',
      price: 0,
    });
  }

  onSubmitOfferForm():void {
    const offerId = this.offerForm.value.id;
    let offer = this.offerForm.value;
    if(!offerId || offerId && offerId=== '') { //CREATION  
      delete offer.Index;
      this.offersService.createOffer(offer).catch(console.error);
    } else { // MODIFICATION
      delete offer.index;
      this.offersService.editOffer(offer, offerId).catch(console.error);
    }
    this.offerForm.reset();
  }

  onEditOffer(offer:Offer): void {
    this.offerForm.setValue({
      id: offer.id ? offer.id : '',
      title: offer.title ? offer.title : '',
      brand: offer.brand ? offer.brand : '',
      model: offer.model ? offer.model : '',
      description: offer.description ? offer.description : '',
      price: offer.price ? offer.price : 0
    });
  }

  onDeleteOffer(offerId?: string): void {
    if (offerId) {
    this.offersService.deleteOffer(offerId).catch(console.error);
    } else {
      console.error('An id must be provided to delete an offer');
      
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
