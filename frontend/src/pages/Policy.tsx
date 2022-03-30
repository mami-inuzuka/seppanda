import { VFC } from 'react'

import { Box, Heading, Link, ListItem, OrderedList, Text } from '@chakra-ui/react'

import { Footer } from 'components/organisms/footer/Footer'
import { HeaderOnlyLogoLayout } from 'components/templates/HeaderOnlyLogoLayout'

export const Policy: VFC = () => (
  <HeaderOnlyLogoLayout>
    <Box
      p={6}
      mb={12}
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
        プライバシーポリシー
      </Heading>
      <Box as="section">
        <Text>
          本サービスは、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
        </Text>
      </Box>
      <Box as="section">
        <Heading as="h3">第1条（個人情報）</Heading>
        <OrderedList>
          <ListItem>
            本サービスでは登録およびご利用に際して以下の情報を取得し、本サービスではそれらを個人情報として取り扱います。
          </ListItem>
          <OrderedList>
            <ListItem>
              外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
            </ListItem>
            <ListItem>その他本サービスへのアクセス時に生成されるログ</ListItem>
          </OrderedList>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第2条（個人情報を収集・利用する目的）</Heading>
        <OrderedList>
          <ListItem>当社が個人情報を収集・利用する目的は、以下のとおりです。</ListItem>
          <OrderedList>
            <ListItem>当社サービスの提供・運営のため</ListItem>
            <ListItem>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</ListItem>
            <ListItem>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</ListItem>
            <ListItem>
              利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため
            </ListItem>
            <ListItem>ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</ListItem>
            <ListItem>上記の利用目的に付随する目的</ListItem>
          </OrderedList>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第3条（利用目的の変更）</Heading>
        <OrderedList>
          <ListItem>
            本サービスは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
          </ListItem>
          <ListItem>
            利用目的の変更を行った場合には、変更後の目的について、本サービス所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">4条（個人情報の第三者提供）</Heading>
        <OrderedList>
          <ListItem>
            本サービスは、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
          </ListItem>
          <OrderedList>
            <ListItem>
              人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
            </ListItem>
            <ListItem>
              公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
            </ListItem>
            <ListItem>
              国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
            </ListItem>
            <ListItem>予め次の事項を告知あるいは公表し、かつ当社が個人情報保護委員会に届出をしたとき</ListItem>
            <OrderedList>
              <ListItem>利用目的に第三者への提供を含むこと</ListItem>
              <ListItem>第三者に提供されるデータの項目</ListItem>
              <ListItem>第三者への提供の手段または方法</ListItem>
              <ListItem>本人の求めに応じて個人情報の第三者への提供を停止すること</ListItem>
              <ListItem>本人の求めを受け付ける方法</ListItem>
            </OrderedList>
          </OrderedList>
          <ListItem>
            前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
            <OrderedList>
              <ListItem>
                本サービスが利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
              </ListItem>
              <ListItem>合併その他の事由による事業の承継に伴って個人情報が提供される場合</ListItem>
              <ListItem>
                個人情報を特定の者との間で共同して利用する場合であって、その旨並びに共同して利用される個人情報の項目、共同して利用する者の範囲、利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について、あらかじめ本人に通知し、または本人が容易に知り得る状態に置いた場合
              </ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第5条（アクセス解析ツール）</Heading>
        <OrderedList>
          <ListItem>
            当サービスは、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは右記のリンクからご確認ください。
            <Link
              color="green.500"
              display="inline"
              textDecoration="underline"
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
            >
              Google アナリティクス利用規約
            </Link>
          </ListItem>
        </OrderedList>
      </Box>
      <Box as="section">
        <Heading as="h3">第6条（プライバシーポリシーの変更）</Heading>
        <OrderedList>
          <ListItem>
            本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
          </ListItem>
          <ListItem>
            本サービスが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
          </ListItem>
        </OrderedList>
      </Box>

      <Text>2022年 03月08日 制定</Text>
      <Text>2022年 03月30日 改訂</Text>
    </Box>
    <Footer />
  </HeaderOnlyLogoLayout>
)
