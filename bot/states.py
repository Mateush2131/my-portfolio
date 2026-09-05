from aiogram.fsm.state import State, StatesGroup


class OrderManageStates(StatesGroup):
    waiting_deadline = State()
    waiting_notes = State()
