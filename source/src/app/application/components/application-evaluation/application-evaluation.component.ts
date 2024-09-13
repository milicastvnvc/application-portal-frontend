import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { routeCheck } from 'src/app/shared/helpers/route-checker';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ApplicationEvaluationService } from '../../services/application-evaluation.service';

@Component({
  selector: 'app-application-evaluation',
  templateUrl: './application-evaluation.component.html',
  styleUrls: ['./application-evaluation.component.scss']
})
export class ApplicationEvaluationComponent {
  evaluationForm!: FormGroup;
  applicationId: number | undefined;
  isExistingEvaluation = false;
  
  constructor(private fb: FormBuilder,private evaluationService: ApplicationEvaluationService,private route: ActivatedRoute, private toastService: ToastService) {}

  ngOnInit(): void {
    this.evaluationForm = this.fb.group({
      averageGrade: [0, [Validators.required, Validators.max(25)]],
      additionalEngagement: [0, [Validators.required, Validators.max(5)]],
      yearLevelStudy: [0, [Validators.required, Validators.max(5)]],
      totalAchievement: [{ value: 0, disabled: true }, Validators.required],
      applicationQuality: [0, [Validators.required, Validators.max(10)]],
      previousErasmusParticipation: [0, [Validators.required, Validators.max(10)]],
      programLanguageSkills: [0, [Validators.required, Validators.max(5)]],
      totalOther: [{ value: 0, disabled: true }, Validators.required],
      overallResult: [{ value: 0, disabled: true }, Validators.required]
    });

    this.applicationId = routeCheck(this.route);
    // console.log(this.applicationId);

    this.checkAndLoadEvaluation();
    this.setupAutomaticCalculations();
  }

  
  setupAutomaticCalculations(): void {
    
    this.evaluationForm.get('averageGrade')?.valueChanges.subscribe(() => {
      this.calculateTotalAchievement();
      this.calculateOverallResult();  
    });
    this.evaluationForm.get('additionalEngagement')?.valueChanges.subscribe(() => {
        this.calculateTotalAchievement();
        this.calculateOverallResult();  
    });
    this.evaluationForm.get('yearLevelStudy')?.valueChanges.subscribe(() => {
        this.calculateTotalAchievement();
        this.calculateOverallResult();  
    });

    this.evaluationForm.get('applicationQuality')?.valueChanges.subscribe(() => {
        this.calculateTotalOther();
        this.calculateOverallResult();  
    });
    this.evaluationForm.get('previousErasmusParticipation')?.valueChanges.subscribe(() => {
        this.calculateTotalOther();
        this.calculateOverallResult();  
    });
    this.evaluationForm.get('programLanguageSkills')?.valueChanges.subscribe(() => {
        this.calculateTotalOther();
        this.calculateOverallResult();  
    });

    this.evaluationForm.get('totalAchievement')?.valueChanges.subscribe(() => this.calculateOverallResult());
    this.evaluationForm.get('totalOther')?.valueChanges.subscribe(() => this.calculateOverallResult());
  }

  calculateTotalAchievement(): void {
    const averageGrade = this.evaluationForm.get('averageGrade')?.value || 0;
    const additionalEngagement = this.evaluationForm.get('additionalEngagement')?.value || 0;
    const yearLevelStudy = this.evaluationForm.get('yearLevelStudy')?.value || 0;

    const totalAchievement = averageGrade + additionalEngagement + yearLevelStudy;
    this.evaluationForm.get('totalAchievement')?.setValue(totalAchievement, { emitEvent: false });
  }

  calculateTotalOther(): void {
    const applicationQuality = this.evaluationForm.get('applicationQuality')?.value || 0;
    const previousErasmusParticipation = this.evaluationForm.get('previousErasmusParticipation')?.value || 0;
    const programLanguageSkills = this.evaluationForm.get('programLanguageSkills')?.value || 0;

    const totalOther = applicationQuality + previousErasmusParticipation + programLanguageSkills;
    this.evaluationForm.get('totalOther')?.setValue(totalOther, { emitEvent: false });
  }

  calculateOverallResult(): void {
    const totalAchievement = this.evaluationForm.get('totalAchievement')?.value || 0;
    const totalOther = this.evaluationForm.get('totalOther')?.value || 0;

    const overallResult = totalAchievement + totalOther;
    this.evaluationForm.get('overallResult')?.setValue(overallResult, { emitEvent: false });
  }

  checkAndLoadEvaluation() {
    this.evaluationService.getEvaluation(this.applicationId!).subscribe({
      next: (data) => {
        if (data.application_id != null) {
          this.isExistingEvaluation = true;
          this.evaluationForm.patchValue({
            averageGrade: data.averageGrade,
            additionalEngagement: data.additionalEngagement,
            yearLevelStudy: data.yearLevelStudy,
            totalAchievement: data.totalAchievement,
            applicationQuality: data.applicationQuality,
            previousErasmusParticipation: data.previousErasmusParticipation,
            programLanguageSkills: data.programLanguageSkills,
            totalOther: data.totalOther,
            overallResult: data.overallResult
          });
        } else {
          this.isExistingEvaluation = false;
        }
      },
      error: (error) => {
        console.error('Error while loading evaluation:', error);
        this.toastService.showErrorsToast(['Failed to load evaluation data.']);
      }
    });
  }

  onSubmit() {
    if (this.evaluationForm.valid) {
      const evaluationData = {
        application_id: this.applicationId,
        ...this.evaluationForm.getRawValue()  
      };

      if (this.isExistingEvaluation) {
        this.evaluationService.updateEvaluation(this.applicationId!, evaluationData).subscribe({
          next: (response) => {
            console.log('Evaluation updated successfully:', response);
            this.toastService.showSuccessToast('Evaluation updated successfully!');
          },
          error: (error) => {
            console.error('Error while updating evaluation:', error);
            this.toastService.showErrorsToast(['Failed to update evaluation.']); 
          }
        });
      } else {
        this.evaluationService.addEvaluation(evaluationData).subscribe({
          next: (response) => {
            console.log('Evaluation added successfully:', response);
            this.isExistingEvaluation = true;
            this.toastService.showSuccessToast('Evaluation added successfully!');
          },
          error: (error) => {
            console.error('Error while adding evaluation:', error);
            this.toastService.showErrorsToast(['Failed to add evaluation.']);
          }
        });
      }
    } else {
      console.log('The form is not valid');
      this.toastService.showErrorsToast(['Form is invalid. Please check the inputs.']);
    }
  }

  
}
