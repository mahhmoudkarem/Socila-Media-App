import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'socialApp';

  flowbiteService = inject(FlowbiteService)
  ngOnInit(): void {

    this.flowbiteService.loadFlowbite(flowbite =>{
      
    })

  }
}
    
  

