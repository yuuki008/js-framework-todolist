import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import styled from "styled-components";
import TextDetail from './uikit/TextDetail'
import { registerCard } from '../fetch/stripe'

export const PaymentEdit = () => {
  const history = useHistory()
  const stripe = useStripe() // クライアントでstripeの情報がもてるhooks
  const elements = useElements() // Elementsコンポーネントに渡したstripeの情報をもらえる（wrappingした公開キーとかも？）

  const register = useCallback(() => {
    registerCard(stripe, elements)
  }, [stripe, elements])

  return (
    <Wrapper>
      <Title>クレジットカード情報の登録・編集</Title>
      <CardWrapper>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: "gray",
                '::placeholder': {
                  color: "lightgray",
                }
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </CardWrapper>
      <div>
        <Description>
          このECアプリではStripeのテスト用カードを使うことができます。
          <br />実際に決済することはないので安心して使ってください。
          <br/>CVCコード、郵便番号はどんなものでもOKです。有効期限は来年の年月ならなんでもOK！
        </Description>
        <CardDetailWrapper>
        <TextDetail label={"VISA"} value={"4242 4242 4242 4242"} key={"test-visa"}/>
        <TextDetail label={"Master Card"} value={"5555 5555 5555 4444"} key={"test-master-card"}/>
        <TextDetail label={"AMEX"} value={"3782 822463 10005"} key={"test-amex"}/>
        <TextDetail label={"Discover"} value={"6011 1111 1111 1117"} key={"test-discover"}/>
        <TextDetail label={"Diners Club"} value={"3056 9300 0902 0004"} key={"test-diners-club"}/>
        </CardDetailWrapper>
        <ButtonWrapper>
          <button
            onClick={register}
          >
            カード情報を登録する
          </button>
          <button
            onClick={() => history.push('/mypage')}
          >
            マイページに戻る
          </button>
        </ButtonWrapper>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 40px 0;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 550;
  width: 100%;
  padding: 20px 0;
`
const CardWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`
const Description = styled.div`
  font-size: 10px;
  padding: 10px;
  font-weight: 500;
  margin: 20px 0;
`

const CardDetailWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`

const ButtonWrapper = styled.div`
  width: 90%;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
`