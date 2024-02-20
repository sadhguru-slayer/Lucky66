from rest_framework import viewsets,permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from datetime import datetime, timedelta

class BudgetCalcViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @staticmethod
    def simulate_budget_calculation(current_budget, target_budget,selected_option):
        day = 0
        result_data = []

        def amount_x(present_budget,selected_option):
            if selected_option == "4 levels":
                a = present_budget / 40
            elif selected_option == "4 levels + 1":
                a=(present_budget*0.92)/76.8
            elif selected_option == "5 levels":
                a = present_budget / 121
            elif selected_option == "5 levels + 1":
                a=(present_budget*0.92)/232.32
            elif selected_option == "6 levels":
                a = present_budget / 364
            return int(a)

        def profit_add(amount, present_budget):
            present_budget += amount*0.9208
            return present_budget
        if target_budget is not None:

            while True:
                amount = amount_x(current_budget,selected_option)
                current_budget = profit_add(amount, current_budget)
                current_budget = profit_add(amount, current_budget)
                _2percent_bet_profit = current_budget*0.019
                current_budget += _2percent_bet_profit
                current_budget = profit_add(amount, current_budget)
                day += 1
                current_date = datetime.now().date() + timedelta(days=day)
                result_data.append({
                    "Day":day,
                    "Date": current_date,
                    "Initial_bet_amount": amount,
                    "2_percent_bet_profit": _2percent_bet_profit,
                    "Total_amount_on_day": current_budget
                })

                if current_budget > target_budget:
                    break
        else:
            amount = amount_x(current_budget,selected_option)
            current_budget = profit_add(amount, current_budget)
            current_budget = profit_add(amount, current_budget)
            _2percent_bet_profit = current_budget*0.019
            current_budget += _2percent_bet_profit
            current_budget = profit_add(amount, current_budget)
            result_data.append({
                    "Date": current_date,
                    "Initial_bet_amount": amount,
                    "2_percent_bet_profit": _2percent_bet_profit,
                    "Total_amount_on_day": current_budget
                })

        return result_data


    def list(self, request,result_data=None):
        return Response(result_data)


    def create(self, request):
        present_budget = int(request.data.get('currentbudget'))
        target_budget = int(request.data.get('targetbudget'))
        selected_option = request.data.get('options')
        # alpabets = request.data.get('alpabets')

        result_data = self.simulate_budget_calculation(present_budget, target_budget,selected_option)
        
        return self.list(request, result_data)
        # pass

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass