import { View, Text } from 'react-native'
import React from 'react'
import tw from "twrnc";
import { useTranslation } from 'react-i18next';

type NextReminderProp = {
  Description: string;
  Urgency: string;
  DueOdometer: string;
  DueDate: string;
}

const NextReminder = (props: NextReminderProp) => {
  const { t } = useTranslation();
  return (
    <View style={tw`flex flex-row flex-wrap bg-blue-50 py-4 px-5 rounded-3xl`}>
      <Text style={tw`w-4/6 font-bold text-lg`}>Next {t("Reminder")}</Text>
      <Text style={tw`w-2/6 font-semibold self-end text-center text-red-700 bg-red-100 p-2 py-1 rounded-xl`}>{props.Urgency.toUpperCase()}</Text>
      <Text style={tw`w-full font-semibold mt-3 mb-1`}>{props.DueDate} || {props.DueOdometer}</Text>
      <Text style={tw`font-semibold text-left`}>{props.Description.substring(0, 70)}...</Text>
    </View>
  )
}

export default NextReminder