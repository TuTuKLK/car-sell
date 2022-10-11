import { OffersService } from './../../services/offers.service';
import { Offer } from './../../interfaces/offer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.scss']
})
export class SingleOfferComponent implements OnInit {

  currentOffer!: Offer;

  constructor(
    private offersService: OffersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const offerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.offersService.getOfferById(<string>offerId)
    .then(offer => this.currentOffer = offer)
    .catch(console.error);
  }

}
