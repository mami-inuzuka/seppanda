import { VFC } from 'react'

import { Box, Heading, ListItem, OrderedList, Text } from '@chakra-ui/react'

import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'

export const Terms: VFC = () => (
  <HeaderOnlyLogoLayout>
    <Box
      p={6}
      fontSize="xs"
      sx={{
        h3: {
          fontSize: 'md',
          mb: 2,
        },
        section: {
          mb: 8,
        },
        ol: {
          pl: 2,
          mb: 6,
          lineHeight: 1.8,
        },
        li: {
          mb: 2,
        },
        'ol ol': {
          pl: 6,
        },
        'ol ol li': {
          listStyle: 'lower-alpha',
          mb: 1,
        },
        'ol ol li:first-of-type': {
          mt: 2,
        },
        'section p': {
          mb: 2,
        },
      }}
    >
      <Heading fontSize="2xl" textAlign="center" mt={6} mb={8}>
        利用規約
      </Heading>
      <Box as="section">
        <Heading as="h3">第1条（適用）</Heading>
        <OrderedList>
          <ListItem>本規約は、ユーザーと本サービスの利用に関わる一切の関係に適用されるものとします。</ListItem>
          <ListItem>
            本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
          </ListItem>
          <ListItem>
            本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第2条（利用登録）</Heading>
        <OrderedList>
          <ListItem>
            本サービスにおいては、登録希望者が本規約に同意の上、本サービスの定める方法によって利用登録を申請し、本サービスがこの承認を登録希望者に通知することによって、利用登録が完了するものとします。
          </ListItem>
          <ListItem>
            本サービスは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
          </ListItem>
          <OrderedList>
            <ListItem>利用登録の申請に際して虚偽の事項を届け出た場合</ListItem>
            <ListItem>本規約に違反したことがある者からの申請である場合</ListItem>
            <ListItem>その他、本サービスが利用登録を相当でないと判断した場合</ListItem>
          </OrderedList>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第3条（ユーザーIDおよびパスワードの管理）</Heading>
        <OrderedList>
          <ListItem>
            利用者は、自己の責任において、本サービスの利用者IDおよびパスワード等を適切に管理及び保管するものとします。利用者は、いかなる場合にも、アカウントの使用権限を第三者に譲渡または貸与することはできません。
          </ListItem>
          <ListItem>
            パスワード又はユーザーID等の管理不十分、第三者の使用等によって生じた損害または不利益に関する責任は利用者が負うものとし、運営者は一切の責任を負いません。
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第4条（禁止事項）</Heading>
        <Text>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</Text>
        <OrderedList>
          <ListItem>法令または公序良俗に違反する行為</ListItem>
          <ListItem>犯罪行為に関連する行為</ListItem>
          <ListItem>
            本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
          </ListItem>
          <ListItem>本サービスの運営を妨害するおそれのある行為</ListItem>
          <ListItem>他のユーザーに関する個人情報等を収集または蓄積する行為</ListItem>
          <ListItem>不正アクセスをし、またはこれを試みる行為</ListItem>
          <ListItem>他のユーザーに成りすます行為</ListItem>
          <ListItem>本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</ListItem>
          <ListItem>
            本サービスの他のユーザーまたは第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
          </ListItem>
          <ListItem>
            以下の表現を含み、または含むと本サービスが判断する内容を本サービス上に投稿し、または送信する行為
          </ListItem>
          <OrderedList>
            <ListItem>過度に暴力的な表現</ListItem>
            <ListItem>露骨な性的表現</ListItem>
            <ListItem>人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現</ListItem>
            <ListItem>自殺、自傷行為、薬物乱用を誘引または助長する表現</ListItem>
            <ListItem>その他反社会的な内容を含み他人に不快感を与える表現</ListItem>
          </OrderedList>
          <ListItem>
            以下を目的とし、または目的とすると本サービスが判断する行為
            <OrderedList>
              <ListItem>
                営業、宣伝、広告、勧誘、その他営利を目的とする行為（本サービスの認めたものを除きます。）
              </ListItem>
              <ListItem>性行為やわいせつな行為を目的とする行為</ListItem>
              <ListItem>面識のない異性との出会いや交際を目的とする行為</ListItem>
              <ListItem>他のユーザーに対する嫌がらせや誹謗中傷を目的とする行為</ListItem>
              <ListItem>
                本サービス、本サービスの他のユーザー、または第三者に不利益、損害または不快感を与えることを目的とする行為
              </ListItem>
              <ListItem>その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為</ListItem>
            </OrderedList>
            <ListItem>宗教活動または宗教団体への勧誘行為</ListItem>
            <ListItem>その他、本サービスが不適切と判断する行為</ListItem>
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第5条（本サービスの提供の停止等）</Heading>
        <OrderedList>
          <ListItem>
            本サービスは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
          </ListItem>
          <OrderedList>
            <ListItem>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</ListItem>
            <ListItem>
              地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
            </ListItem>
            <ListItem>コンピュータまたは通信回線等が事故により停止した場合</ListItem>
            <ListItem>その他、本サービスが本サービスの提供が困難と判断した場合</ListItem>
          </OrderedList>
          <ListItem>
            本サービスは、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第6条（著作権）</Heading>
        <OrderedList>
          <ListItem>
            ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た文章、画像や映像等の情報に関してのみ、本サービスを利用し、投稿ないしアップロードすることができるものとします。
          </ListItem>
          <ListItem>
            ユーザーが本サービスを利用して投稿ないしアップロードした文章、画像、映像等の著作権については、当該ユーザーその他既存の権利者に留保されるものとします。ただし、本サービスは、本サービスを利用して投稿ないしアップロードされた文章、画像、映像等について、本サービスの改良、品質の向上、または不備の是正等ならびに本サービスの周知宣伝等に必要な範囲で利用できるものとし、ユーザーは、この利用に関して、著作者人格権を行使しないものとします。
          </ListItem>
          <ListItem>
            前項本文の定めるものを除き、本サービスおよび本サービスに関連する一切の情報についての著作権およびその他の知的財産権はすべて本サービスまたは本サービスにその利用を許諾した権利者に帰属し、ユーザーは無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます。）、伝送、配布、出版、営業使用等をしてはならないものとします。
          </ListItem>
        </OrderedList>
      </Box>

      <Box as="section">
        <Heading as="h3">第7条（利用制限および登録抹消）</Heading>
        <OrderedList>
          <ListItem>
            本サービスは、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、投稿データを削除し、ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。
          </ListItem>
          <ListItem>
            <OrderedList>
              <ListItem>本規約のいずれかの条項に違反した場合</ListItem>
              <ListItem>登録事項に虚偽の事実があることが判明した場合</ListItem>
              <ListItem>決済手段として当該ユーザーが届け出たクレジットカードが利用停止となった場合</ListItem>
              <ListItem>料金等の支払債務の不履行があった場合</ListItem>
              <ListItem>本サービスからの連絡に対し、一定期間返答がない場合</ListItem>
              <ListItem>本サービスについて、最終の利用から一定期間利用がない場合</ListItem>
              <ListItem>その他、本サービスが本サービスの利用を適当でないと判断した場合</ListItem>
            </OrderedList>
          </ListItem>
          <ListItem>
            前項各号のいずれかに該当した場合、ユーザーは、当然に本サービスに対する一切の債務について期限の利益を失い、その時点において負担する一切の債務を直ちに一括して弁済しなければなりません。
          </ListItem>
          <ListItem>
            本サービスは、本条に基づき本サービスが行った行為によりユーザーに生じた損害について、一切の責任を負いません。
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第8条（退会）</Heading>
        <OrderedList>
          <ListItem>ユーザーは、本サービスの定める退会手続により、本サービスから退会できるものとします。</ListItem>
        </OrderedList>
      </Box>

      <Box as="section">
        <Heading as="h3">第9条（保証の否認および免責事項）</Heading>
        <OrderedList>
          <ListItem>
            本サービスは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
          </ListItem>
          <ListItem>
            本サービスは、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
          </ListItem>
          <ListItem>
            前項ただし書に定める場合であっても、本サービスは、本サービスの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（本サービスまたはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、本サービスの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
          </ListItem>
          <ListItem>
            本サービスは、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
          </ListItem>
        </OrderedList>
      </Box>

      <Box as="section">
        <Heading as="h3">第10条（サービス内容の変更等）</Heading>
        <OrderedList>
          <ListItem>
            本サービスは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
          </ListItem>
        </OrderedList>
      </Box>

      <Box as="section">
        <Heading as="h3">第11条（利用規約の変更）</Heading>
        <OrderedList>
          <ListItem>
            本サービスは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第12条（個人情報の取扱い）</Heading>
        <OrderedList>
          <ListItem>
            本サービスは、本サービスの利用によって取得する個人情報については、本サービス「プライバシーポリシー」に従い適切に取り扱うものとします。
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第13条（通知または連絡）</Heading>
        <OrderedList>
          <ListItem>
            ユーザーと本サービスとの間の通知または連絡は、本サービスの定める方法によって行うものとします。本サービスは、ユーザーから、本サービスが別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第14条（権利義務の譲渡の禁止）</Heading>
        <OrderedList>
          <ListItem>
            ユーザーは、本サービスの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第15条（準拠法・裁判管轄）</Heading>
        <OrderedList>
          <ListItem>本規約の解釈にあたっては、日本法を準拠法とします。</ListItem>
          <ListItem>
            本サービスに関して紛争が生じた場合には、本サービスの本店所在地を管轄する裁判所を専属的合意管轄とします。
          </ListItem>
        </OrderedList>
      </Box>
      <Text>2022年 03月08日 制定</Text>
    </Box>
  </HeaderOnlyLogoLayout>
)
